
import React from 'react';
import { CreditCard, Zap, ShieldCheck, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Feature, Testimonial, FAQItem } from './types';

export const PRIMARY_PURPLE = '#8B5CF6';

export const FEATURES: Feature[] = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "1.99% per sale",
    description: "Flat rate. No tiers. No monthly fees. No surprises."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Paid in seconds",
    description: "Your money hits your EDITH card instantly. Ready to spend."
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Smart Inventory",
    description: "Scan invoices to auto-update stock. Manage everything from your device."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Data Insights",
    description: "Real-time analytics to spot trends and manage restocking."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Local & Secure",
    description: "Data stored locally. 5GB free cloud backup included for peace of mind."
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "No hardware",
    description: "Just your phone. No readers to charge or dongles to lose."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Marcus Chen",
    role: "Coffee Roaster",
    content: "E.D.I.T.H Rp replaced my $500 POS system. Now I just use my iPhone at the farmer's market. It's magic.",
    rating: 5
  },
  {
    id: '2',
    name: "Sarah Jenkins",
    role: "Independent Artist",
    content: "I can take payments anywhere. The 1.99% fee is the most transparent I've found in 5 years of selling.",
    rating: 5
  },
  {
    id: '3',
    name: "David 'DK' Kim",
    role: "Street Food Vendor",
    content: "The money is there instantly. I can buy more supplies for the next shift immediately.",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How do I get paid?",
    answer: "Every sale you make goes instantly to your EDITH Visa Prepaid Card. You can spend it anywhere Visa is accepted or transfer it to your bank."
  },
  {
    question: "Which phones are compatible?",
    answer: "Any iPhone or Android smartphone with NFC capabilities can act as a POS terminal with the EDITH app."
  },
  {
    question: "Are there any monthly fees?",
    answer: "No. You only pay the 1.99% transaction fee when you make a sale. No monthly subscriptions, no setup fees."
  },
  {
    question: "Is it safe for my customers?",
    answer: "Absolutely. E.D.I.T.H Rp uses the same NFC technology as Apple Pay and Google Pay. We never store card data on your device."
  }
];
