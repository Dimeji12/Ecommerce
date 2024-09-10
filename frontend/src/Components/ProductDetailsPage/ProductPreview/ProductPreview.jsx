import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateGlobalState } from "src/Features/globalSlice";
import PreviewImages from "./PreviewImages";
import s from "./ProductPreview.module.scss";
import {apiUrl} from "../../../Data/BaseApi.js";

// TODO: Note that other images is loaded here /Components/ProductDetailsPage/ProductPreview/ProductPreview.jsx
const ProductPreview = ({ data, handleZoomInEffect }) => {
  const { previewImg } = useSelector((state) => state.global);
  const [searchParams] = useSearchParams();
  const [apiOtherImages, setApiOtherImages] = useState([]);
  const [productImage, setProductImage] = useState();
  const dispatch = useDispatch();
  const { img, name, id } = data;
  const hasOtherImages = apiOtherImages?.length !== 0 && apiOtherImages;

  function setZoomInPreview(value = false) {
    dispatch(updateGlobalState({ key: "isZoomInPreviewActive", value: value }));
  }

  function setPreviewImg(img) {
    dispatch(updateGlobalState({ key: "previewImg", value: img }));
  }

  // Fetch other images when the component mounts or the 'id' changes
  useEffect(() => {
    if (id) {
      const fetchOtherImages = async () => {
        try {
          // Fetch the list of other image data (which includes the IDs)
          const response = await fetch(`${apiUrl}imageData/product/${id}/other-images`);
          if (response.ok) {
            const imageDataArray = await response.json(); // Assuming this returns an array of objects

            // Fetch each image one by one using the IDs
            const imagePromises = imageDataArray.map(async (imageData) => {
              const imageResponse = await fetch(`${apiUrl}otherimagedata/${imageData.id}`);
              if (!imageResponse.ok) {
                throw new Error(`Failed to fetch image with ID: ${imageData.id}`);
              }

              const imageBlob = await imageResponse.blob();
              return URL.createObjectURL(imageBlob);
            });

            // Resolve all image fetch promises and set the state
            const imageUrls = await Promise.all(imagePromises);
            setApiOtherImages(imageUrls);
          } else {
            console.error("Failed to fetch other images");
          }
        } catch (error) {
          console.error("Error fetching other images:", error);
        }
      };

      async function fetchProductImage() {
        if (id != null) {
          const baseUrl = `${apiUrl}imagedata/product/${id}/main-image`;

          try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setProductImage(imageObjectURL);
          } catch (error) {
            console.error('Error fetching image:', error.message);
          }
        }
      }

      fetchProductImage().catch(err => {
        console.log("Fetch failed:", err);
      });

      fetchOtherImages().catch(err => {
        console.log("Fetch failed:", err);
      });


    }
  }, [id]);


  useEffect(() => {
    setPreviewImg(productImage);
  }, [searchParams, productImage]);

  return (
      <section className={s.images}>
        {hasOtherImages && (
            <PreviewImages
                data={apiOtherImages}
                previewImg={productImage}
                setPreviewImg={setPreviewImg}
            />
        )}

        <div className={s.previewImgHolder}>
          <img
              src={previewImg}
              alt={name}
              onMouseMove={handleZoomInEffect}
              onMouseEnter={() => setZoomInPreview(true)}
              onMouseLeave={() => setZoomInPreview(false)}
          />
        </div>
      </section>
  );
};

export default ProductPreview;
