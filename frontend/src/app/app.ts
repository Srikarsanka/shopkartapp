import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CartItem, HealthStatus, Product } from './models/product.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly productService = inject(ProductService);

  readonly appEnv = environment;
  readonly categories = ['All', 'Electronics', 'Apparel', 'Audio', 'Drinkware', 'Accessories'];

  // Reactive state signals
  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');
  readonly products = signal<Product[]>([]);
  readonly cart = signal<CartItem[]>([]);
  readonly isCartOpen = signal<boolean>(false);
  readonly backendHealth = signal<HealthStatus | null>(null);
  readonly toastMessage = signal<string | null>(null);
  readonly isCheckingOut = signal<boolean>(false);
  readonly checkoutSuccess = signal<boolean>(false);

  // Computed state
  readonly totalCartItems = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly shipping = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub >= 50 ? 0 : 9.99;
  });

  readonly tax = computed(() => +(this.subtotal() * 0.0825).toFixed(2));

  readonly grandTotal = computed(() =>
    +(this.subtotal() + this.shipping() + this.tax()).toFixed(2)
  );

  ngOnInit(): void {
    this.checkHealth();
    this.loadProducts();
  }

  checkHealth(): void {
    this.productService.getHealth().subscribe({
      next: (health) => this.backendHealth.set(health),
      error: () => this.backendHealth.set(null)
    });
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.selectedCategory(), this.searchQuery())
      .subscribe((data) => this.products.set(data));
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.loadProducts();
  }

  onSearch(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    const currentCart = [...this.cart()];
    const existingIndex = currentCart.findIndex((i) => i.product.id === product.id);

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += 1;
    } else {
      currentCart.push({ product, quantity: 1 });
    }

    this.cart.set(currentCart);
    this.showToast(`Added "${product.name}" to cart!`);
  }

  updateQuantity(productId: string, delta: number): void {
    const current = [...this.cart()];
    const index = current.findIndex((i) => i.product.id === productId);
    if (index === -1) return;

    const newQty = current[index].quantity + delta;
    if (newQty <= 0) {
      current.splice(index, 1);
      this.showToast('Item removed from cart');
    } else {
      current[index].quantity = newQty;
    }
    this.cart.set(current);
  }

  removeFromCart(productId: string): void {
    const updated = this.cart().filter((i) => i.product.id !== productId);
    this.cart.set(updated);
    this.showToast('Item removed from cart');
  }

  toggleCart(): void {
    this.isCartOpen.update((open) => !open);
    if (this.checkoutSuccess()) {
      this.checkoutSuccess.set(false);
    }
  }

  proceedToCheckout(): void {
    if (this.cart().length === 0) return;
    this.isCheckingOut.set(true);

    // Simulate checkout API call
    setTimeout(() => {
      this.isCheckingOut.set(false);
      this.checkoutSuccess.set(true);
      this.cart.set([]);
      this.showToast('Order placed successfully! Demo completed.');
    }, 1200);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 3000);
  }
}
