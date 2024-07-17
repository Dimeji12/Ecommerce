import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SIMPLE_DELAYS } from 'src/Data/globalVariables';
import { updateGlobalState } from 'src/Features/globalSlice';
import useUpdateLoadingState from 'src/Hooks/App/useUpdateLoadingState';
import useOnlineStatus from 'src/Hooks/Helper/useOnlineStatus';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
import SkeletonCards from '../Shared/SkeletonLoaders/ProductCard/SkeletonCards';
import s from './SearchPage.module.scss';
import SearchProducts from './SearchProducts/SearchProducts';

const SearchPage = () => {
  const { t } = useTranslation();
  const { loadingSearchProducts } = useSelector((state) => state.global);
  const { searchProducts } = useSelector((state) => state.products);
  const isWebsiteOnline = useOnlineStatus();
  useUpdateLoadingState({
    loadingState: loadingSearchProducts,
    loadingKey: 'loadingSearchProducts',
    actionMethod: updateGlobalState,
    delays: SIMPLE_DELAYS,
    dependencies: [searchProducts],
  });

  return (
    <>
      <Helmet>
        <title>Search</title>
        <meta
          name="description"
          content="Find what you're looking for quickly and easily on Dales's search page. Enter the product name or keywords to discover a wide range of options tailored to your preferences."
        />
      </Helmet>

      <div className="container">
        <main className={s.searchPage}>
          <PagesHistory history={['/', t('history.results')]} />

          <section className={s.products} id="search-page">
            {(loadingSearchProducts || !isWebsiteOnline) && <SkeletonCards />}
            {!loadingSearchProducts && isWebsiteOnline && <SearchProducts />}
          </section>
        </main>
      </div>
    </>
  );
};
export default SearchPage;
