/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51N7v6eSEKt1v2oTCgXD6scSGxMsSlWcYD6ETUISUFa7xd4tLeCi2g9fplPSHZKlnLxvp0Xii76QBBoQlJ7XW5scS00rlCfD6GJ'
    );
    //1) get the session from the server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    //2) use stripe to create checkout form and also charge
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error.message);
  }
};
