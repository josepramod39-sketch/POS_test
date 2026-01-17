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

export interface InventoryItem {
  id: string;
  sku: string;
  upc: string;
  name: string;
  stock_bt: number; // Bottles
  stock_cs: number; // Cases
  pack: number; // Pack size (e.g. 6, 12)
  price: number;
  category: 'Spirits' | 'Wine' | 'Beer';
}

export interface StockMovement {
  id: string;
  productName: string;
  type: 'PURCHASE' | 'SALE' | 'ADJ' | 'RETURN';
  quantity: number;
  unit: 'BT' | 'CS';
  timestamp: string;
}