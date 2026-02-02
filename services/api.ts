import { 
  Restaurant, 
  Menu, 
  MenuItem, 
  Offer, 
  ApiResponse,
  OrderType,
  OfferType,
  TimeAvailability,
  Addons
} from '@/types/api.types';

const API_BASE_URL = __DEV__ 
  ? 'http://10.15.11.181:3000' 
  : 'https://your-production-url.com';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return { 
          success: false, 
          error: result.message || result.error || 'An error occurred' 
        };
      }

      return { 
        success: true, 
        data: result.data,
        message: result.message 
      };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  async createRestaurant(data: {
    name: string;
    franchise?: string | null;
    location: string;
    available?: boolean;
    timezone?: string;
  }): Promise<ApiResponse<Restaurant>> {
    return this.request<Restaurant>('/restaurants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRestaurantById(id: string): Promise<ApiResponse<Restaurant>> {
    return this.request<Restaurant>(`/restaurants/${id}`, {
      method: 'GET',
    });
  }

  async createMenu(
    restaurantId: string, 
    version: number = 1
  ): Promise<ApiResponse<Menu>> {
    return this.request<Menu>('/menus', {
      method: 'POST',
      body: JSON.stringify({
        restaurantId,
        version,
        categories: [],
      }),
    });
  }

  async getMenuByRestaurant(restaurantId: string): Promise<ApiResponse<Menu>> {
    return this.request<Menu>(`/menus/restaurant/${restaurantId}`, {
      method: 'GET',
    });
  }

async addMenuItem(menuId: string, item: {
  categoryName: string;
  name: string;
  description?: string;
  price: number;
  orderType?: OrderType;
  time?: TimeAvailability;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  addons?: Addons;
  imageBase64?: string; // Added this
}): Promise<ApiResponse<MenuItem>> {
  return this.request<MenuItem>(`/menus/${menuId}/items`, {
    method: 'POST',
    body: JSON.stringify({
      ...item,
      orderType: item.orderType || 'DINE_IN',
    }),
  });
}

async updateMenuItem(
  menuId: string, 
  itemId: string, 
  item: Partial<{
    name: string;
    price: number;
    orderType: OrderType;
    time?: TimeAvailability;
    addons?: Addons;
    imageBase64?: string; 
  }>
): Promise<ApiResponse<MenuItem>> {
  return this.request<MenuItem>(`/menus/${menuId}/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
}

  async deleteMenuItem(menuId: string, itemId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/menus/${menuId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async createOffer(data: {
    item_id?: string;
    category_id?: string;
    type: OfferType;
    amount: number;
    max_discount: number;
    available_from?: string;
    available_to?: string;
  }): Promise<ApiResponse<Offer>> {
    return this.request<Offer>('/offers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOffersByItem(itemId: string): Promise<ApiResponse<Offer[]>> {
    return this.request<Offer[]>(`/offers/item/${itemId}`, {
      method: 'GET',
    });
  }

  async getOffersByCategory(categoryId: string): Promise<ApiResponse<Offer[]>> {
    return this.request<Offer[]>(`/offers/category/${categoryId}`, {
      method: 'GET',
    });
  }
}

export default new ApiService();