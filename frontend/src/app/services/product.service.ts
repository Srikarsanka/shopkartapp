import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, HealthStatus, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Fetches health status from backend
   */
  getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(`${this.apiUrl}/health`).pipe(
      catchError((error) => {
        console.warn('Backend /api/health unreachable:', error.message);
        return of({
          status: 'OFFLINE',
          service: 'shopkart-backend',
          version: 'offline-mode',
          environment: 'offline',
          uptime: 0,
          timestamp: new Date().toISOString()
        });
      })
    );
  }

  /**
   * Fetches product catalog from backend API with offline fallback
   */
  getProducts(category?: string, search?: string): Observable<Product[]> {
    let url = `${this.apiUrl}/products`;
    const params: string[] = [];
    if (category && category !== 'All') {
      params.push(`category=${encodeURIComponent(category)}`);
    }
    if (search) {
      params.push(`search=${encodeURIComponent(search)}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return this.http.get<ApiResponse<Product[]>>(url).pipe(
      map((response) => response.data || []),
      catchError((err) => {
        console.warn('Using fallback products due to API error:', err.message);
        return of(this.getFallbackProducts(category, search));
      })
    );
  }

  /**
   * Get single product by ID
   */
  getProductById(id: string): Observable<Product | null> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`).pipe(
      map((res) => res.data),
      catchError(() => {
        const fallback = this.getFallbackProducts().find((p) => p.id === id);
        return of(fallback || null);
      })
    );
  }

  private getFallbackProducts(category?: string, search?: string): Product[] {
    const list: Product[] = [
      {
        id: 'prod-101',
        name: 'CloudNative DevOps Hoodie',
        category: 'Apparel',
        description: 'Premium fleece hoodie featuring subtle embroidered Kubernetes and cloud icons.',
        price: 54.99,
        rating: 4.8,
        reviewsCount: 142,
        stock: 25,
        badge: 'Best Seller',
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-102',
        name: 'Mechanical Keyboard (Cherry Brown)',
        category: 'Electronics',
        description: 'Compact 75% hot-swappable mechanical keyboard with RGB backlighting.',
        price: 89.50,
        rating: 4.9,
        reviewsCount: 310,
        stock: 12,
        badge: 'Popular',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-103',
        name: 'Zero-Latency Ergonomic Mouse',
        category: 'Electronics',
        description: 'High-precision wireless optical sensor with 26,000 DPI and programmable buttons.',
        price: 64.00,
        rating: 4.6,
        reviewsCount: 88,
        stock: 40,
        badge: 'Sale',
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-104',
        name: 'Containerized Coffee Tumbler (20oz)',
        category: 'Drinkware',
        description: 'Double-wall vacuum insulated stainless steel tumbler keeps brew scalding hot.',
        price: 24.95,
        rating: 4.7,
        reviewsCount: 95,
        stock: 60,
        badge: 'Staff Pick',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-105',
        name: 'Noise-Cancelling Dev Headphones',
        category: 'Audio',
        description: 'Over-ear active noise cancelling headphones with dual microphones.',
        price: 149.99,
        rating: 4.7,
        reviewsCount: 215,
        stock: 18,
        badge: 'Featured',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-106',
        name: '4K USB-C Hub & Docking Station',
        category: 'Accessories',
        description: 'Aluminum 8-in-1 adapter with 4K@60Hz HDMI and 100W Power Delivery.',
        price: 45.00,
        rating: 4.5,
        reviewsCount: 76,
        stock: 33,
        badge: null,
        imageUrl: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80'
      }
    ];

    return list.filter((p) => {
      const matchCat = !category || category === 'All' || p.category.toLowerCase() === category.toLowerCase();
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }
}
