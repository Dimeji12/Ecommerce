import { productsData } from "src/Data/productsData"; // Consider whether you still need this import
import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard";
import s from "./ExploreProducts.module.scss";
import {useEffect, useState} from "react";
import {apiUrl} from "../../../Data/BaseApi.js";

const ExploreProducts = ({ numOfProducts = -1, customization }) =>
{

  const [products, setProducts] = useState([]);

  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        const response = await fetch(`${apiUrl}Products`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok)
        {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error)
      {
        console.error('Error fetching Products:', error);
      }
    };

    fetchProducts();
  }, []);


  // If numOfProducts is -1, show all products; otherwise, slice to the specified number
  const filteredProducts = numOfProducts === -1
    ? products
    : products.slice(0, numOfProducts);

  return (
    <div className={s.products}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.productId}
            customization={customization}
          />
        ))
      ) : (
        <p>No products available</p>  // Optionally, handle empty state
      )}
    </div>
  );
};

export default ExploreProducts;
