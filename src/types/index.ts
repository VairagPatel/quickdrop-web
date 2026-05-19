export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'customer' | 'rider' | 'admin';
  created_at?: string;
}

export interface Order {
  id: string;
  customer_id: string;
  rider_id?: string;
  status: 'pending' | 'picking' | 'dispatched' | 'delivered';
  total_amount: number;
  delivery_address: string;
  customer_name?: string;
  rider_name?: string;
  items_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
  created_at?: string;
}

export interface OrderWithDetails extends Order {
  customer?: User;
  rider?: User;
  order_items?: OrderItem[];
}

export interface Rider extends User {
  active_order_count?: number;
}

export type OrderStatus = 'pending' | 'picking' | 'dispatched' | 'delivered';
