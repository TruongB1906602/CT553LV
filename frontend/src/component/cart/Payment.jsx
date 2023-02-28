import React, {useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Typography } from "@material-ui/core";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/OrderAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../more/Loader";
import { savePaymentMethod } from "../../actions/CartAction";

const Payment = ({ history }) => {
  window.scrollTo(0,0);
  const cart =useSelector((state) => state.cart)
  const {shippingInfo}=cart
  // const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
const [paymentMethod, setPaymentMethod]= useState("Paypal");
  const dispatch = useDispatch();
  if(!shippingInfo){
    history.push("/shipping");

  }


  const submitHandler = async (e) => {
    dispatch(savePaymentMethod(paymentMethod));
    e.preventDefault();
    history.push("/placeorder");
  }


  return (
   <>
   

    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <Typography>Chọn phương thức thanh toán</Typography>
        <div>
          <div>
            <input type="radio" value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)}/>
            <span> Paypal or credit card</span>
          </div>
        </div>

        <button type="submit">  Continue</button>
      </form>
    </div>
    { <ToastContainer 
     position="bottom-center"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     /> }
  </>
   )}
  


export default Payment;