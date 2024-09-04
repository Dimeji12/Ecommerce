import React, { useState } from 'react';
import styles from './AddressForm';


const AddressForm = ({ onAddressChange }) => {
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
    onAddressChange(address); // Pass the updated address back to the parent component
  };

  return (
    <div className={styles.addressFormContainer}>
      <h2>Shipping Address</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="123 Main St"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="New York"
          />
        </div>

        <div className={styles.inlineGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="NY"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              placeholder="10001"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="United States"
          />
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
