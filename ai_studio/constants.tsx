import React from 'react';
import { CreditCard, Zap, ShieldCheck, Box, Smartphone } from 'lucide-react';
import { Feature, Testimonial, FAQItem } from './types';

export const PRIMARY_PURPLE = '#8B5CF6';

export const FEATURES: Feature[] = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "0% MDR on UPI",
    description: "Accept payments from any UPI app (GPay, PhonePe, Paytm) at zero cost to you."
  },
  {
    icon: <Box className="w-6 h-6" />,
    title: "Live Inventory",
    description: "Scan barcodes to update stock. Track bottles, cases, and breakage in real-time."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant T+0 Payouts",
    description: "Don't wait for banks. Funds settle in your EDITH account in real-time."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure by Design",
    description: "Enterprise-grade security. Certified for RuPay, Visa, and Mastercard tapping."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Arjun Mehta",
    role: "Cafe Owner, Mumbai",
    content: "E.D.I.T.H Rp changed everything. I stopped using my rental swipe machine. Customers just tap their phone to mine, and UPI works like a dream.",
    rating: 5
  },
  {
    id: '2',
    name: "Priya Sharma",
    role: "Boutique Owner, Delhi",
    content: "The best part is getting paid instantly. Most Indian gateways take 2 days, but EDITH settled my Diwali sale funds in seconds.",
    rating: 5
  },
  {
    id: '3',
    name: "Suresh Kumar",
    role: "Liquor Store, Bangalore",
    content: "The real-time inventory is a lifesaver. I scan the Breakthru invoice and my stock levels are updated instantly. No more manual logs.",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a GST number?",
    answer: "No, you can start as an individual or sole proprietor. We handle the verification in minutes via Aadhaar/PAN."
  },
  {
    question: "How does scanning work?",
    answer: "Just point your phone's camera at any product barcode. Our AI recognizes the SKU instantly and updates your stock levels."
  },
  {
    question: "Is there a monthly rental fee?",
    answer: "Zero. Unlike traditional banks in India, we don't charge any fixed monthly fees or paper roll costs. You only pay a small fee on card transactions."
  },
  {
    question: "How do I withdraw my money?",
    answer: "You can use your EDITH Card for business expenses or transfer the balance to any Indian bank account via IMPS/NEFT instantly."
  }
];