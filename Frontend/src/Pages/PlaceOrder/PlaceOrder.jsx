import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { sendFormSubmissionEmail } from '../../utils/sendFormSubmissionEmail';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormSubmissionEmail({
      email,
      formName: 'Order Form',
    });
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className='title'>Delivery Informaton</p>
        <div className="multi-fields">
          <input type="text" placeholder='First-name' />
          <input type="text" placeholder='Last-name' />
        </div>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email-address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details"><p>Delivery fee</p>
              <p> ${getTotalCartAmount() === 0 ? 0 : 2}</p></div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>

        </div>


      </div>
    </form>
  );
};

export default PlaceOrder;
