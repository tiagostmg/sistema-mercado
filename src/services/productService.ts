import { Product } from '../models/Product';

const API_URL = 'http://localhost:8080/products';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Falha ao buscar produtos');
    }
    return response.json();
  },

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Falha ao buscar produto com ID ${id}`);
    }
    return response.json();
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Falha ao criar produto');
    }
    return response.json();
  },

  async updateProduct(id: number, product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`Falha ao atualizar produto com ID ${id}`);
    }
    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Falha ao excluir produto com ID ${id}`);
    }
  },
};

