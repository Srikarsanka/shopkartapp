
/**
 * Fictional catalog data for ShopKart demo application.
 * In a production architecture, this would reside in a database
 * (e.g. PostgreSQL or MongoDB).
 */

const PRODUCTS = [
  {
    id: "prod-101",
    name: "CloudNative DevOps Hoodie",
    category: "Apparel",
    description:
      "Premium fleece hoodie featuring subtle embroidered Kubernetes and cloud icons. Perfect for chilly server rooms.",
    price: 54.99,
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    badge: "Best Seller",
    imageUrl:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-102",
    name: "Mechanical Keyboard (Cherry Brown)",
    category: "Electronics",
    description:
      "Compact 75% hot-swappable mechanical keyboard with RGB backlighting, braided USB-C cable, and tactile switches.",
    price: 89.50,
    rating: 4.9,
    reviewsCount: 310,
    stock: 12,
    badge: "Popular",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-103",
    name: "Zero-Latency Ergonomic Mouse",
    category: "Electronics",
    description:
      "High-precision wireless optical sensor with 26,000 DPI, programmable macro buttons, and 90-hour battery life.",
    price: 64.00,
    rating: 4.6,
    reviewsCount: 88,
    stock: 40,
    badge: "Sale",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-104",
    name: "Containerized Coffee Tumbler (20oz)",
    category: "Drinkware",
    description:
      "Double-wall vacuum insulated stainless steel tumbler keeps brew scalding hot through long incident postmortems.",
    price: 24.95,
    rating: 4.7,
    reviewsCount: 95,
    stock: 60,
    badge: "Staff Pick",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-105",
    name: "Noise-Cancelling Dev Headphones",
    category: "Audio",
    description:
      "Over-ear active noise cancelling headphones with dual microphones and multi-point Bluetooth pairing.",
    price: 149.99,
    rating: 4.7,
    reviewsCount: 215,
    stock: 18,
    badge: "Featured",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-106",
    name: "4K USB-C Hub & Docking Station",
    category: "Accessories",
    description:
      "Aluminum 8-in-1 adapter with 4K@60Hz HDMI, 100W Power Delivery pass-through, Gigabit Ethernet, and SD card reader.",
    price: 45.00,
    rating: 4.5,
    reviewsCount: 76,
    stock: 33,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-107",
    name: "DevOps Engineer Laptop Backpack",
    category: "Accessories",
    description:
      "Water-resistant laptop backpack with padded compartments, cable organizers, and dedicated storage for tech essentials.",
    price: 49.99,
    rating: 4.7,
    reviewsCount: 124,
    stock: 30,
    badge: "New Arrival",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-108",
    name: "Smart Fitness Watch",
    category: "Electronics",
    description:
      "Modern smartwatch featuring activity tracking, heart-rate monitoring, customizable watch faces, and smartphone notifications.",
    price: 119.99,
    rating: 4.5,
    reviewsCount: 203,
    stock: 22,
    badge: "Trending",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-109",
    name: "Minimalist Desk Lamp",
    category: "Accessories",
    description:
      "Sleek LED desk lamp with adjustable positioning and soft lighting for comfortable late-night coding sessions.",
    price: 39.95,
    rating: 4.6,
    reviewsCount: 91,
    stock: 35,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-110",
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    description:
      "Compact wireless speaker with rich sound, portable design, and a rechargeable battery for music on the go.",
    price: 59.99,
    rating: 4.4,
    reviewsCount: 167,
    stock: 28,
    badge: "Popular",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-111",
    name: "Classic Everyday Sneakers",
    category: "Apparel",
    description:
      "Versatile everyday sneakers with a lightweight construction and cushioned soles for all-day comfort.",
    price: 69.00,
    rating: 4.5,
    reviewsCount: 188,
    stock: 42,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-112",
    name: "Premium Travel Coffee Mug",
    category: "Drinkware",
    description:
      "Reusable insulated travel mug designed to keep your favorite drinks at the right temperature during your commute.",
    price: 19.99,
    rating: 4.6,
    reviewsCount: 113,
    stock: 55,
    badge: "Best Value",
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-113",
    name: "Wireless Gaming Controller",
    category: "Electronics",
    description:
      "Ergonomic wireless controller with responsive buttons, dual vibration feedback, and a comfortable grip for gaming.",
    price: 44.99,
    rating: 4.7,
    reviewsCount: 146,
    stock: 19,
    badge: "Featured",
    imageUrl:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-114",
    name: "Premium Leather Wallet",
    category: "Accessories",
    description:
      "Slim everyday wallet with organized card slots, a minimalist profile, and a classic finish.",
    price: 29.50,
    rating: 4.3,
    reviewsCount: 82,
    stock: 38,
    badge: null,
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-115",
    name: "Ultrawide Monitor",
    category: "Electronics",
    description:
      "Wide-screen monitor ideal for multitasking, coding, managing terminal windows, and improving desktop productivity.",
    price: 329.99,
    rating: 4.8,
    reviewsCount: 174,
    stock: 10,
    badge: "Premium",
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-116",
    name: "Classic Aviator Sunglasses",
    category: "Apparel",
    description:
      "Timeless aviator-style sunglasses with a lightweight frame and versatile everyday styling.",
    price: 34.99,
    rating: 4.4,
    reviewsCount: 97,
    stock: 45,
    badge: "Trending",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-117",
    name: "Portable SSD 1TB",
    category: "Electronics",
    description:
      "Compact external solid-state drive for backing up project files, transferring large datasets, and storing development environments.",
    price: 99.99,
    rating: 4.8,
    reviewsCount: 231,
    stock: 16,
    badge: "Best Seller",
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prod-118",
    name: "Ergonomic Office Chair",
    category: "Accessories",
    description:
      "Comfort-focused office chair with adjustable height, supportive backrest, and padded seating for extended work sessions.",
    price: 199.99,
    rating: 4.7,
    reviewsCount: 159,
    stock: 8,
    badge: "Limited Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80"
  }
];

module.exports = { PRODUCTS };
