import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'var(--color-background-light)',
      padding: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '1.5rem' }}>
          <Link to="/admin" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            Painel Administrativo
          </Link>
        </h1>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
            <li>
              <Link to="/admin" style={{ 
                color: 'var(--color-text)', 
                textDecoration: 'none',
                padding: '0.5rem',
                borderBottom: '2px solid var(--color-primary)'
              }}>
                Produtos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

