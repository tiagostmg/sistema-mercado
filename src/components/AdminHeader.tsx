import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminHeader.module.css';

export const AdminHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <Link to="/admin" className={styles.titleLink}>
            Painel Administrativo
          </Link>
        </h1>

        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/admin" className={styles.navLink}>
                Produtos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};