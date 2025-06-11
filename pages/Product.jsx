import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Row, Col, Badge } from "react-bootstrap";
import { getAllProducts, getAllBrands, getAllCategories } from "../src/API/api";
import { FaRupeeSign } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    const productRes = await getAllProducts();
    const brandRes = await getAllBrands();
    const categoryRes = await getAllCategories();

    if (productRes.success) setProducts(productRes.products);
    if (brandRes.success) setBrands(brandRes.brands);
    if (categoryRes.success) setCategories(categoryRes.categories);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const getBrandName = (id) => brands.find((b) => b.id === id)?.name || "N/A";
  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "N/A";

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Products</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading products...</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image || "/no-image.png"}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderBottom: "1px solid #eee",
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {product.description?.substring(0, 80) || "-"}...
                  </Card.Text>

                  <div className="mb-2">
                    <strong>Price: </strong>
                    <FaRupeeSign className="me-1" />
                    {product.price.toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.85rem" }}>
                    <Badge bg="info" className="me-1">
                      {getBrandName(product.brandId)}
                    </Badge>
                    <Badge bg="secondary">{getCategoryName(product.categoryId)}</Badge>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-light d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </small>
                  <Button
                    variant="success"
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => alert(`Add ${product.name} to cart`)}
                  >
                    Add to Cart
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Product;
