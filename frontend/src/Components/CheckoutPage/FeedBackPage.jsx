import React, { useState } from 'react';
import s from './CheckoutPage.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const FeedBackPage = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const [rating, setRating] = useState(0); // state to track selected rating

  const handleSendClick = (e) => {
    e.preventDefault();
    setIsWidgetVisible(false);
  };

  const handleEditClick = () => {
    setIsWidgetVisible(true);
    setRating(0); // reset rating state when editing
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const getHeaderContent = () => {
    switch (rating) {
      case 1:
        
        return 'I just hate it 😠';
      case 2:
        return "I don't like it 😒";
      case 3:
        return 'It is awesome 😄';
      case 4:
        return 'I just like it 😎';
      case 5:
        return 'I just love it 😍';
      default:
        return ''; // Default or initial state
    }
  };

  return (
    <section className={s.rating}>
      <div>
        <div className={s.containerRating}>
          {isWidgetVisible && (
            <p className="text-white">
              Please leave your feedback on the products
            </p>
          )}

          {!isWidgetVisible && (
            <div
              className={`${s.post} ${isWidgetVisible ? s.hidden : s.visible}`}
            >
              <div className={s.text}>Thanks for rating us!</div>
              <div className={s.edit} onClick={handleEditClick}>
                EDIT
              </div>
            </div>
          )}
          {isWidgetVisible && (
            <div
              className={`${s.starWidget} ${
                isWidgetVisible ? s.visible : s.hidden
              }`}
            >
              <input
                type="radio"
                name="rate"
                id="rate-5"
                onChange={() => handleRatingChange(5)}
              />
              <label
                htmlFor="rate-5"
                className={`fas fa-star ${rating >= 5 ? 'checked' : ''}`}
              ></label>
              <input
                type="radio"
                name="rate"
                id="rate-4"
                onChange={() => handleRatingChange(4)}
              />
              <label
                htmlFor="rate-4"
                className={`fas fa-star ${rating >= 4 ? 'checked' : ''}`}
              ></label>
              <input
                type="radio"
                name="rate"
                id="rate-3"
                onChange={() => handleRatingChange(3)}
              />
              <label
                htmlFor="rate-3"
                className={`fas fa-star ${rating >= 3 ? 'checked' : ''}`}
              ></label>
              <input
                type="radio"
                name="rate"
                id="rate-2"
                onChange={() => handleRatingChange(2)}
              />
              <label
                htmlFor="rate-2"
                className={`fas fa-star ${rating >= 2 ? 'checked' : ''}`}
              ></label>
              <input
                type="radio"
                name="rate"
                id="rate-1"
                onChange={() => handleRatingChange(1)}
              />
              <label
                htmlFor="rate-1"
                className={`fas fa-star ${rating >= 1 ? 'checked' : ''}`}
              ></label>

              <form>
                <header>{getHeaderContent()}</header>
                <div className={s.textarea}>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    placeholder="Describe your experience...."
                  ></textarea>
                </div>
                <div className={s.btn}>
                  <button id="send" onClick={handleSendClick}>
                    Post
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <Link
          to="/track-order"
          className="link-underline text-black text-decoration-underline mt-5"
        >
          Track Order
        </Link>
      </div>
    </section>
  );
};

export default FeedBackPage;
