import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    title: "Premium Coffee Maker",
    description: "Professional-grade coffee maker with temperature control and timer. Perfect for coffee enthusiasts who appreciate precision brewing.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    category: "Appliances"
  },
  {
    id: 2,
    title: "Wireless Noise-Canceling Headphones",
    description: "High-fidelity audio with advanced noise cancellation technology. Experience music in its purest form.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Smart Fitness Watch",
    description: "Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, sleep tracking, and more.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1",
    category: "Wearables"
  }
];