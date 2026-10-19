export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string | null;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
  environment: string;
  uptime: number;
  timestamp: string;
}
