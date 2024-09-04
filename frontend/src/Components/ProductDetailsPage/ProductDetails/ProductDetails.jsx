import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import useOnlineStatus from "src/Hooks/Helper/useOnlineStatus";
import SkeletonProductDetails from "../../Shared/SkeletonLoaders/DetailsPage/SkeletonProductDetails";
import ProductPreview from "../ProductPreview/ProductPreview";
import ProductColorsSection from "./ProductColorsSection/ProductColorsSection";
import ProductDealingControls from "./ProductDealingControls/ProductDealingControls";
import s from "./ProductDetails.module.scss";
import ProductFeatures from "./ProductFeatures/ProductFeatures";
import ProductFirstInfos from "./ProductFirstInfos/ProductFirstInfos";
import ProductSizes from "./ProductSizes/ProductSizes";
import {apiUrl} from "../../../Data/BaseApi.js";

const ProductDetails = ({data}) => {
    const {previewImg, isZoomInPreviewActive, loadingProductDetails} =
        useSelector((state) => state.global);
    const zoomInImgRef = useRef();
    const isWebsiteOnline = useOnlineStatus();
    const activeClass = isZoomInPreviewActive ? s.active : "";

    function handleZoomInEffect(e) {
        const imgRect = e.target.getClientRects()[0];
        const xPosition = e.clientX - imgRect.left;
        const yPosition = e.clientY - imgRect.top;

        zoomInImgRef.current.style.transform = `translate(-${xPosition * 2}px, -${
            yPosition * 2
        }px)`;
    }

    // const [productImage, setProductImage] = useState();
    // useEffect(() => {
    //     async function fetchProductImage() {
    //         if (data.id != null) {
    //             const baseUrl = `${apiUrl}imagedata/product/${data.id}/main-image`;
    //
    //             try {
    //                 const response = await fetch(baseUrl);
    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! status: ${response.status}`);
    //                 }
    //
    //
    //                 const imageBlob = await response.blob();
    //                 const imageObjectURL = URL.createObjectURL(imageBlob);
    //                 setProductImage(imageObjectURL);
    //                 console.log("Image fetch successful for product ID:", id);
    //             } catch (error) {
    //                 console.error('Error fetching image:', error.message);
    //             }
    //         }
    //     }
    //
    //     fetchProductImage().catch(err => {
    //         console.log("Fetch failed:", err);
    //     });
    // }, [id]);
    //

    return (
        <>
            {!loadingProductDetails && isWebsiteOnline && (
                <section className={s.detailsSection} id="details-section">
                    <ProductPreview data={data} handleZoomInEffect={handleZoomInEffect}/>

                    <section className={s.details}>
                        <div className={`${s.zoomInPreview} ${activeClass}`}>
                            <img src={previewImg} alt="product preview" ref={zoomInImgRef}/>
                        </div>

                        <ProductFirstInfos data={data}/>

                        <div className={s.horizontalLine}/>

                        {/* <ProductColorsSection data={data} /> */}
                        {data?.sizes && <ProductSizes data={data}/>}
                        <ProductDealingControls data={data}/>
                        <ProductFeatures/>
                    </section>
                </section>
            )}

            {(loadingProductDetails || !isWebsiteOnline) && (
                <SkeletonProductDetails/>
            )}
        </>
    );
};
export default ProductDetails;
