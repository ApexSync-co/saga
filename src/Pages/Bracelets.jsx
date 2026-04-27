import React, { useState, useEffect } from 'react';
import ProductPageLayout from '../Components/ProductPageLayout';
import { fetchProductsByCategory } from '../services/products';

const Bracelets = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory('Bracelets');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching bracelets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 flex justify-center">
        <div className="text-white text-xl">Loading Gold Plated Collection...</div>
      </div>
    );
  }

  return (
    <ProductPageLayout title="Gold Plated" products={products} />
  );
};

export default Bracelets;