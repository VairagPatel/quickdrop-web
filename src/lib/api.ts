import { Order, Product, Rider, OrderWithDetails } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  // Orders
  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/api/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    const data = await response.json();
    return data.orders;
  },

  async getOrder(id: string): Promise<OrderWithDetails> {
    const response = await fetch(`${API_URL}/api/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    const data = await response.json();
    return data.order;
  },

  async updateOrderStatus(id: string, status: string, rider_id?: string) {
    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, rider_id }),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  },

  // Products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products;
  },

  async updateProductStock(product_id: string, stock: number) {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, stock }),
    });
    if (!response.ok) throw new Error('Failed to update stock');
    return response.json();
  },

  // Riders
  async getRiders(): Promise<Rider[]> {
    const response = await fetch(`${API_URL}/api/riders`);
    if (!response.ok) throw new Error('Failed to fetch riders');
    const data = await response.json();
    return data.riders;
  },
};
