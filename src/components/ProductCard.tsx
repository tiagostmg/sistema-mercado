import React from 'react';
import { Product } from '../models/Product';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{product.name}</h3>
      <div className={styles.cardInfo}>
        <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
        <p><strong>Quantidade:</strong> {product.quantity}</p>
      </div>
      <div className={styles.cardActions}>
        <button 
          className="btn-secondary" 
          onClick={handleEdit}
        >
          Editar
        </button>
        <button 
          className="btn-danger" 
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};