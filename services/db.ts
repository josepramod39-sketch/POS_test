import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp,
    where,
    runTransaction,
    Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
export { db };
import { Product, StockMovement } from "../types";

const PRODUCTS_COLLECTION = "products";
const TRANSACTIONS_COLLECTION = "transactions";

// Add a new product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
            ...product,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            // Ensure default values for new fields
            stock_bt: product.stock_bt || 0,
            stock_cs: product.stock_cs || 0,
            pack_size: product.pack_size || 1
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
};

// Get all products
export const getProducts = async () => {
    try {
        const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Product[];
    } catch (error) {
        console.error("Error getting products: ", error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (id: string, data: Partial<Product>) => {
    try {
        const productRef = doc(db, PRODUCTS_COLLECTION, id);
        await updateDoc(productRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id: string) => {
    try {
        const productRef = doc(db, PRODUCTS_COLLECTION, id);
        await deleteDoc(productRef);
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
};

// Record a stock movement (for manual adjustments)
export const recordStockMovement = async (movement: Omit<StockMovement, 'id' | 'timestamp'>) => {
    try {
        await addDoc(collection(db, "movements"), {
            ...movement,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error recording movement:", error);
        throw error;
    }
};

export interface CartItem extends Product {
    quantity: number; // Bottles
}

// Create a Transaction (POS Sale)
export const createTransaction = async (items: CartItem[], totalAmount: number, userId: string) => {
    if (!items.length) throw new Error("Cart is empty");

    try {
        await runTransaction(db, async (transaction) => {
            // 1. Read all product docs first (Firestore requirement: reads before writes)
            const productReads = [];
            for (const item of items) {
                const ref = doc(db, PRODUCTS_COLLECTION, item.id);
                productReads.push({ ref, item });
            }

            const productDocs = await Promise.all(productReads.map(p => transaction.get(p.ref)));

            // 2. Validate Stock
            for (let i = 0; i < productDocs.length; i++) {
                const snapshot = productDocs[i];
                if (!snapshot.exists()) {
                    throw new Error(`Product ${productReads[i].item.name} not found.`);
                }

                const currentData = snapshot.data() as Product;
                const requestedQty = productReads[i].item.quantity;
                const currentBt = currentData.stock_bt || 0;

                if (currentBt < requestedQty) {
                    throw new Error(`Insufficient stock for ${currentData.name}. Available: ${currentBt} bottles.`);
                }
            }

            // 3. Process Updates & Create Transaction Record

            // A. Create Transaction Entry
            const transactionRef = doc(collection(db, TRANSACTIONS_COLLECTION));
            transaction.set(transactionRef, {
                userId,
                totalAmount,
                itemCount: items.length,
                status: 'COMPLETED',
                items: items.map(i => ({
                    id: i.id,
                    name: i.name,
                    price: i.price_bt, // Assuming bottle price
                    quantity: i.quantity
                })),
                timestamp: serverTimestamp()
            });

            // B. Deduct Inventory
            for (let i = 0; i < productDocs.length; i++) {
                const snapshot = productDocs[i];
                const item = productReads[i].item;
                const currentData = snapshot.data() as Product;

                transaction.update(productReads[i].ref, {
                    stock_bt: (currentData.stock_bt || 0) - item.quantity,
                    updatedAt: serverTimestamp()
                });
            }
        });

        console.log("Transaction successfully committed!");
        return true;
    } catch (e) {
        console.error("Transaction failed: ", e);
        throw e;
    }
};
