import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { Product } from './models/product.model';

describe('ShopKart App Component', () => {
  const dummyProduct: Product = {
    id: 'test-p1',
    name: 'DevOps Coffee Mug',
    category: 'Drinkware',
    description: 'Ceramic mug for tests',
    price: 20.0,
    rating: 4.8,
    reviewsCount: 10,
    stock: 15,
    badge: 'Popular',
    imageUrl: 'https://example.com/mug.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create the App component', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with empty cart and default category All', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.cart().length).toBe(0);
    expect(app.totalCartItems()).toBe(0);
    expect(app.selectedCategory()).toBe('All');
  });

  it('should add items to cart and compute subtotal correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.addToCart(dummyProduct);
    expect(app.cart().length).toBe(1);
    expect(app.totalCartItems()).toBe(1);
    expect(app.subtotal()).toBe(20.0);

    // Adding same product increments quantity
    app.addToCart(dummyProduct);
    expect(app.cart().length).toBe(1);
    expect(app.totalCartItems()).toBe(2);
    expect(app.subtotal()).toBe(40.0);
  });

  it('should toggle cart drawer open state', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.isCartOpen()).toBe(false);
    app.toggleCart();
    expect(app.isCartOpen()).toBe(true);
    app.toggleCart();
    expect(app.isCartOpen()).toBe(false);
  });

  it('should update quantity and remove item when quantity hits zero', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.addToCart(dummyProduct);
    expect(app.cart().length).toBe(1);

    app.updateQuantity(dummyProduct.id, -1);
    expect(app.cart().length).toBe(0);
    expect(app.totalCartItems()).toBe(0);
  });
});
