import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCard = (product) => (
    <div className="card" key={product._id}>
      <img
        src={`/api/v1/product/product-photo/${product._id}`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <div className="card-name-price">
          <h5 className="card-title">{product.name}</h5>
          <h5 className="card-title card-price">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h5>
        </div>
        <p className="card-text ">
          {product.description.substring(0, 60)}...
        </p>
        <div className="card-name-price">
          <button
            className="btn btn-info ms-1"
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );

  const renderCardRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 3) {
      const row = (
        <div className="row" key={i}>
          <div className="col-md-3 mb-2 mt-2 offset-md-1">
            {renderCard(products[i])}
          </div>
          <div className="col-md-3 mb-2 mt-2 offset-md-1">
            {i + 1 < products.length && renderCard(products[i + 1])}
          </div>
          <div className="col-md-3 mb-2 mt-2 offset-md-1">
            {i + 2 < products.length && renderCard(products[i + 2])}
          </div>
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        {renderCardRows()}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
