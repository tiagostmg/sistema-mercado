import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ProductForm from './pages/ProductForm';
import './global.css';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products/add" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}


