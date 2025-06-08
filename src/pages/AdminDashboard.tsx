import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../models/Product';
import { productService } from '../services/productService';
import styles from './AdminDashboard.module.css';

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
        <div className={styles.headerRow}>
          <h2 className="page-title">Gerenciar Produtos</h2>
        </div>

        {loading && <p>Carregando produtos...</p>}
        
        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className={styles.emptyBox}>
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: 'block' }}
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;