import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock_bt: number; // Bottles
  stock_cs: number; // Cases
  pack: number;     // Pack size (e.g. 6, 12, 24)
  sku: string;
  upc?: string;     // Universal Product Code
  description?: string;
  imageUrl?: string;
  createdAt?: number;
  updatedAt?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Sale {
  id?: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'nfc';
  createdAt: number;
  userId: string;
}

export interface StockMovement {
  id?: string;
  productId: string;
  productName: string;
  type: 'PURCHASE' | 'SALE' | 'ADJ' | 'RETURN';
  quantity: number;
  unit: 'BT' | 'CS'; // Bottle or Case
  timestamp: any;    // Firestore Timestamp or number
  userId?: string;
}