/**
 * Fictional catalog data for ShopKart demo application.
 * In a production architecture, this would reside in a database (e.g. PostgreSQL, MongoDB).
 */
const PRODUCTS = [
  {
    id: "prod-101",
    name: "CloudNative DevOps Hoodie",
    category: "Apparel",
    description: "Premium fleece hoodie featuring subtle embroidered Kubernetes and cloud icons. Perfect for chilly server rooms.",
    price: 54.99,
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-102",
    name: "Mechanical Keyboard (Cherry Brown)",
    category: "Electronics",
    description: "Compact 75% hot-swappable mechanical keyboard with RGB backlighting, braided USB-C cable, and tactile switches.",
    price: 89.50,
    rating: 4.9,
    reviewsCount: 310,
    stock: 12,
    badge: "Popular",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-103",
    name: "Zero-Latency Ergonomic Mouse",
    category: "Electronics",
    description: "High-precision wireless optical sensor with 26,000 DPI, programmable macro buttons, and 90-hour battery life.",
    price: 64.00,
    rating: 4.6,
    reviewsCount: 88,
    stock: 40,
    badge: "Sale",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-104",
    name: "Containerized Coffee Tumbler (20oz)",
    category: "Drinkware",
    description: "Double-wall vacuum insulated stainless steel tumbler keeps brew scalding hot through long incident postmortems.",
    price: 24.95,
    rating: 4.7,
    reviewsCount: 95,
    stock: 60,
    badge: "Staff Pick",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-105",
    name: "Noise-Cancelling Dev Headphones",
    category: "Audio",
    description: "Over-ear active noise cancelling headphones with dual microphones and multi-point Bluetooth pairing.",
    price: 149.99,
    rating: 4.7,
    reviewsCount: 215,
    stock: 18,
    badge: "Featured",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-106",
    name: "4K USB-C Hub & Docking Station",
    category: "Accessories",
    description: "Aluminum 8-in-1 adapter with 4K@60Hz HDMI, 100W Power Delivery pass-through, Gigabit Ethernet, and SD card reader.",
    price: 45.00,
    rating: 4.5,
    reviewsCount: 76,
    stock: 33,
    badge: null,
    imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80"
  }
];

module.exports = { PRODUCTS };
