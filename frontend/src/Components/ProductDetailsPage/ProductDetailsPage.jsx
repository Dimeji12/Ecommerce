import { Helmet } from 'react-helmet-async';
import { SIMPLE_DELAYS } from 'src/Data/globalVariables';
import { updateGlobalState } from 'src/Features/globalSlice';
import useScrollOnMount from 'src/Hooks/App/useScrollOnMount';
import useUpdateLoadingOnSamePage from 'src/Hooks/App/useUpdateLoadingOnSamePage';
import useGetSearchParam from 'src/Hooks/Helper/useGetSearchParam';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
import ProductDetails from './ProductDetails/ProductDetails';
import s from './ProductDetailsPage.module.scss';
import RelatedItemsSection from './RelatedItemsSection/RelatedItemsSection';
import { useState, useEffect } from 'react';
import {apiUrl} from "../../Data/BaseApi.js";

//TODO: Note that all products are loaded here /Components/ProductDetailsPage/ProductDetailsPage.jsx
const ProductDetailsPage = () =>
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
        console.log("Fetched Products:", data);
        setProducts(data);
      } catch (error)
      {
        console.error('Error fetching Products:', error);
      }
    };

    fetchProducts();
  }, []);

  const PRODUCT_NAME = useGetSearchParam('product');
  const PRODUCT_DATA = products.find(
    (product) => product?.name?.toLowerCase() === PRODUCT_NAME?.toLowerCase()
  );

  const productCategory = PRODUCT_DATA?.category;
  const productName = PRODUCT_DATA?.shortName;

  const history = [
    'Account',
    productCategory,
    productName,
  ];

  const historyPaths = [
    {
      index: 0,
      path: '/profile',
    },
    {
      index: 1,
      path: `/category?type=${PRODUCT_DATA?.category}`,
    },
  ];

  useUpdateLoadingOnSamePage({
    loadingKey: 'loadingProductDetails',
    actionMethod: updateGlobalState,
    delays: SIMPLE_DELAYS,
    dependencies: [PRODUCT_NAME],
  });
  useScrollOnMount(200);

  return (
    <>
      <Helmet>
        <title>{PRODUCT_DATA?.shortName}</title>
        <meta
          name="description"
          content="Explore the details and specifications of your favorite products on Dales. Find everything you need to know, from features to customer reviews, before making your purchase."
        />
      </Helmet>

      <div className="container">
        <main className={s.detailsPage}>
          <PagesHistory history={history} historyPaths={historyPaths} />
          <ProductDetails data={PRODUCT_DATA} />
          <RelatedItemsSection
              products = {products}
            productType={PRODUCT_DATA?.category}
            currentProduct={PRODUCT_DATA}
          />
        </main>
      </div>
    </>
  );
};

export default ProductDetailsPage;
