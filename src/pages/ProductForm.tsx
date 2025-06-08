import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { Product } from '../models/Product';
import { productService } from '../services/productService';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    quantity: 0
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const product = await productService.getProductById(Number(id));
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity
      });
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      setError('Falha ao carregar dados do produto. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditing) {
        await productService.updateProduct(Number(id), formData);
      } else {
        await productService.createProduct(formData);
      }
      
      navigate('/admin');
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      setError('Falha ao salvar produto. Por favor, verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <h2 className="page-title">
          {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
        </h2>

        {error && (
          <div style={{ 
            backgroundColor: 'rgba(178, 34, 34, 0.1)', 
            border: '1px solid var(--color-primary)', 
            padding: 'var(--spacing-md)', 
            borderRadius: 'var(--border-radius-sm)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <p>{error}</p>
          </div>
        )}

        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome do Produto</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Preço (R$)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantidade em Estoque</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                step="1"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;