import React, { useEffect, useState } from 'react';
import './trackOrder.css';

const TrackOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    // Function to retrieve items from localStorage
    const getItemsFromLocalStorage = () => {
      const items = JSON.parse(localStorage.getItem('trackingOrder')) || [];
      setCartItems(items);
    };
    console.log(cartItems);

    // Call the function to get items when component mounts
    getItemsFromLocalStorage();
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartItems changes
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += parseFloat(item.price) * item.quantity; // Assuming price is a string, convert to float
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]); // Recalculate whenever cartItems changes
  // Function to generate a random alphanumeric string
  const generateRandomString = (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

 // Function to format a date object into "DD Month YYYY" format
const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  // Example usage
  const today = new Date();
  const todayDate = formatDate(today);
  
  
    
  const randomOrderNumber = generateRandomString(8); // Adjust length as needed
//   const todayDate = formattedDate();

  return (
    <div className="my-5">
      <div className="card">
        <div className="title">Purchase Reciept</div>
        <div className="info">
          <div className="row">
            <div className="col-7">
              <span className="heading">Date</span>
              <br />
              <span className="details">{todayDate}</span>
            </div>
            <div className="col-5 pull-right">
              <span className="heading">Order No.</span>
              <br />
                          <span className="details">{randomOrderNumber}</span>
            </div>
          </div>
        </div>
        <div className="pricing">
          {cartItems.map((item) => (
            <div className="row" key={item.shortName}>
              <div className="col-9">
                <span className="name">{item.shortName}</span>
              </div>
              <div className="col-3">
                <span className="price">&pound;{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <div className="row">
            <div className="col-9"></div>
            <div className="col-3">
              <big>&pound;{totalPrice.toFixed(2)}</big>
            </div>
          </div>
        </div>
        <div className="tracking">
          <div className="title">Tracking Order</div>
        </div>
        <div className="progressTrack">
          <ul className="progressbar">
            <li className="step0 active step1">Ordered</li>
            <li className="step0 active step2 text-center">Shipped</li>
            <li className="step0 active step3 text-right">On the way</li>
            <li className="step0 step4  text-right">Delivered</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
