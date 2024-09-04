import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SIMPLE_DELAYS } from 'src/Data/globalVariables';
import { productCardCustomizations } from 'src/Data/staticData';
import useScrollOnMount from 'src/Hooks/App/useScrollOnMount';
import useUpdateLoadingState from 'src/Hooks/App/useUpdateLoadingState';
import { updateGlobalState } from 'src/Features/globalSlice';
import ExploreProducts from '../Home/ProductPoster/ExploreProducts';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
import SkeletonCards from '../Shared/SkeletonLoaders/ProductCard/SkeletonCards';
import s from './ProductsPage.module.scss';
import { useState, useEffect } from 'react';
import { apiUrl } from "../../Data/BaseApi.js";

//TODO: Note that all products are loaded here
const ProductsPage = () =>
{
  const [products, setProducts] = useState([])
  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        const response = await fetch("https://backend20240903110238.azurewebsites.net/api/Products", {
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


  const { loadingProductsPage } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useUpdateLoadingState({
    loadingState: loadingProductsPage,
    loadingKey: 'loadingProductsPage',
    actionMethod: updateGlobalState,
    delays: SIMPLE_DELAYS,
    cleanFunction: () =>
      dispatch(updateGlobalState({ key: 'loadingProductsPage', value: true })),
  });
  useScrollOnMount(200);

  return (
    <>
      <Helmet>
        <title>Products</title>
        <link ref="preconnect" href="https://api.github.com/" />
        <meta
          name="description"
          content="Explore the entire collection of products available on Dales. From fashion to electronics, browse our comprehensive catalog to find the perfect items for your needs."
        />
      </Helmet>

      <div className="container">
        <main className={s.productsPage}>
          <PagesHistory history={['/', t('history.products')]} />

          <section className={s.products} id="products-section">
            {!loadingProductsPage && (
              <ExploreProducts
                customization={productCardCustomizations.allProducts}
                products={products}
              />
            )}

            {loadingProductsPage && (
              <div className={s.SkeletonCards}>
                <SkeletonCards numberOfCards={8} />
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};
export default ProductsPage;
