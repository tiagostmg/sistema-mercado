import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import ProductCard from '../components/ProductCard';
import { Product } from '../models/Product';
import { productService } from '../services/productService';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError('Falha ao carregar produtos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      alert('Falha ao excluir produto. Por favor, tente novamente.');
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h2 className="page-title">Gerenciar Produtos</h2>
        </div>

        {loading && <p>Carregando produtos...</p>}
        
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

        {!loading && !error && products.length === 0 && (
          <div style={{ 
            backgroundColor: 'var(--color-background-light)', 
            padding: 'var(--spacing-lg)', 
            borderRadius: 'var(--border-radius-md)',
            textAlign: 'center'
          }}>
            <p>Nenhum produto cadastrado.</p>
            <button 
              className="btn-primary" 
              onClick={handleAddProduct}
              style={{ marginTop: 'var(--spacing-md)' }}
            >
              Adicionar Produto
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}

        <button 
          className="floating-action-button" 
          onClick={handleAddProduct}
          aria-label="Adicionar produto"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

