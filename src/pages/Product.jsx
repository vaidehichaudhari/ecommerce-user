import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:7001/api/product/getAllProducts'),
      fetch('http://localhost:7001/api/brand/getAllBrands'),
      fetch('http://localhost:7001/api/category/getAllCategories')
    ])
      .then(async ([productRes, brandRes, categoryRes]) => {
        if (!productRes.ok || !brandRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch one or more resources');
        }

        const productData = await productRes.json();
        const brandData = await brandRes.json();
        const categoryData = await categoryRes.json();

        setProducts(productData.products || []);
        setBrands(brandData.brands || []);
        setCategories(categoryData.categories || []);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        toast.error('Failed to load product data');
      });
  }, []);

  const getBrandName = (id) =>
    brands.find((b) => b.id === id || b._id === id)?.name || 'N/A';

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id || c._id === id)?.name || 'N/A';

  const toggleReadMore = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
    // Add logic to store in cart context or localStorage
  };

  const renderStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-secondary" />);
    }
    return stars;
  };

  return (
    <div className="container py-5">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-center mb-4 fw-bold text-primary">🛍️ Discover Amazing Deals!</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.length === 0 ? (
          <p className="text-center text-muted">No products available.</p>
        ) : (
          products.map(product => (
            <div className="col" key={product.id || product._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src={product.image}
                  className="mx-auto d-block mt-3 rounded"
                  alt={product.name}
                  style={{ height: '120px', width: '120px', objectFit: 'cover' }}
                />

                <div className="card-body">
                  <h5 className="card-title fw-semibold">{product.name}</h5>
                  
                  <p className="card-text text-muted small">
                    {expanded[product._id || product.id]
                      ? product.description
                      : `${product.description.slice(0, 60)}...`}
                    {product.description.length > 60 && (
                      <span
                        className="text-primary ms-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleReadMore(product._id || product.id)}
                      >
                        {expanded[product._id || product.id] ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </p>

                  <p className="mb-1"><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                  <p className="mb-1"><strong>Brand:</strong> {getBrandName(product.brandId)}</p>
                  <p className="mb-1"><strong>Category:</strong> {getCategoryName(product.categoryId)}</p>

                  <div className="mb-2">{renderStars(4)}</div>

                  <div className="d-flex justify-content-between">
                    <Button variant="primary" size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
