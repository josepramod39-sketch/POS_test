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
    where
} from "firebase/firestore";
import { db } from "./firebase";
export { db };
import { Product, StockMovement } from "../types";

const PRODUCTS_COLLECTION = "products";

// Add a new product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
            ...product,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
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

// Record a stock movement
export const recordStockMovement = async (movement: Omit<StockMovement, 'id' | 'timestamp'>) => {
    try {
        // 1. Record the movement in a 'movements' collection
        await addDoc(collection(db, "movements"), {
            ...movement,
            timestamp: serverTimestamp(),
        });

        // 2. Update the product stock atomically
        // Note: detailed case-breaking logic (converting cases to bottles) should preferably happen
        // in UI or Cloud Function, but here we will do simple increments/decrements for now.
        // For a robust system, we would read the product first to check if we need to break a case.

        // Simple update for now (assuming pre-calculated or direct unit updates)
        const productRef = doc(db, PRODUCTS_COLLECTION, movement.productId);

        // We can't easily do partial field strings with variables in vanilla JS object keys without computed property names
        // so we construct the update object.
        const updatePayload: any = { updatedAt: serverTimestamp() };

        // In a real app we'd use Firestore `increment` for atomicity: 
        // import { increment } from "firebase/firestore";
        // updatePayload[movement.unit === 'CS' ? 'stock_cs' : 'stock_bt'] = increment(movement.type === 'SALE' ? -movement.quantity : movement.quantity);

        // IMPORTANT: Since we need to read the current stock to do complex math (like breaking a case),
        // we should ideally do this inside a transaction. For this prototype, we'll assume the UI sends the *final* new values
        // OR we just use the caller to call updateProduct separately.

        // Let's rely on the caller to update the product stock for now, 
        // or we can implement a transaction here if the user wants strict consistency.
        // For this step, we will primarily Log the movement here.

    } catch (error) {
        console.error("Error recording movement:", error);
        throw error;
    }
};
