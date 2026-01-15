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
import { Product } from "../types";

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
        await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
};
