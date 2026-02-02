export type OrderType = 'DINE_IN' | 'TAKEAWAY';
export type OfferType = 'PERCENT' | 'FLAT';

export interface Restaurant {
  R_ID: string;
  name: string;
  franchise?: string | null;
  location: string;
  available: boolean;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeAvailability {
  available_from: string;
  available_to: string;
}

export interface Price {
  order_type: OrderType;
  price: number;
  base_price?: number;
  final_price?: number;
  discount?: number;
  applied_offer?: string;
}

export interface Addons {
  min_quantity: number;
  max_quantity: number;
  required: boolean;
}

export interface MenuItem {
  item_id: string;
  category_id: string;
  name: string;
  available_from: string | null;
  available_to: string | null;
  image_base64?: string | null;
  ItemPrices?: Price[];
  AddOn?: Addons;
  dataValues?: {
    is_available_now?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
} 

export interface MenuCategory {
  category_id: string;
  menu_id: string;
  name: string;
  avg_price: number;
  item_count: number;
  Items?: MenuItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Menu {
  menu_id: string;
  R_ID: string;
  version: number;
  Categories?: MenuCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: number;
  item_id?: string;
  category_id?: string;
  type: OfferType;
  amount: number;
  max_discount: number;
  available_from?: string | null;
  available_to?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DisplayMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
  image?: any;
  isAvailable?: boolean;
  originalPrice?: number;
  discount?: number;
}