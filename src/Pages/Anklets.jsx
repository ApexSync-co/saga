import React, { useState, useEffect } from 'react';
import ProductPageLayout from '../Components/ProductPageLayout';
import { fetchProductsByCategory } from '../services/products';

const Anklets = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory('Anklets');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching anklets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <ProductPageLayout title="Anklets" products={products} isLoading={loading} />
    </>
  );
};

export default Anklets;
