import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPrice } = location.state || {};

 
  const validationSchema = Yup.object().shape({
    paymentMethod: Yup.string().required("Required"),
    cardNumber: Yup.string().when("paymentMethod", (paymentMethod, schema) => {
      if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
        return schema.required("Required");
      }
      return schema.nullable();
    }),
    cardExpiry: Yup.string().when("paymentMethod", (paymentMethod, schema) => {
      if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
        return schema.required("Required");
      }
      return schema.nullable();
    }),
    cardCvv: Yup.string().when("paymentMethod", (paymentMethod, schema) => {
      if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
        return schema.required("Required");
      }
      return schema.nullable();
    }),
    bank: Yup.string().when("paymentMethod", (paymentMethod, schema) => {
      if (paymentMethod === "net_banking") {
        return schema.required("Required");
      }
      return schema.nullable();
    }),
    contactNumber: Yup.string().when(
      "paymentMethod",
      (paymentMethod, schema) => {
        if (paymentMethod === "upi") {
          return schema.required("Required");
        }
        return schema.nullable();
      }
    ),
    email: Yup.string().email("Invalid email format").required("Required"),
    receiptEmail: Yup.string()
      .email("Invalid email format")
      .required("Required"),
    couponCode: Yup.string(),
  });

  return (
    <div className="container mt-5">
      <h1>Payment Page</h1>
      {selectedPrice ? (
        <p>You are about to pay: ${selectedPrice}</p>
      ) : (
        <p>No price selected.</p>
      )}
      <Formik
        initialValues={{
          paymentMethod: "",
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
          bank: "",
          contactNumber: "",
          email: "",
          receiptEmail: "",
          couponCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(`Payment of $${selectedPrice} was successful!`);
          navigate("/home");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <h2>Payment Method</h2>
            <Field as="select" name="paymentMethod">
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="net_banking">Net Banking</option>
              <option value="upi">UPI</option>
            </Field>
            <ErrorMessage
              name="paymentMethod"
              component="div"
              className="text-danger"
            />

            {(values.paymentMethod === "credit_card" ||
              values.paymentMethod === "debit_card") && (
              <div>
                <h2>Card Details</h2>
                <Field
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="text-danger"
                />

                <Field
                  type="text"
                  name="cardExpiry"
                  placeholder="Card Expiry (MM/YY)"
                />
                <ErrorMessage
                  name="cardExpiry"
                  component="div"
                  className="text-danger"
                />

                <Field type="text" name="cardCvv" placeholder="Card CVV" />
                <ErrorMessage
                  name="cardCvv"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}

            {values.paymentMethod === "net_banking" && (
              <div>
                <h2>Bank Details</h2>
                <Field as="select" name="bank">
                  <option value="">Select Bank</option>
                  <option value="sbi">SBI</option>
                  <option value="icici">ICICI</option>
                  <option value="hdfc">HDFC</option>
                </Field>
                <ErrorMessage
                  name="bank"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}

            {values.paymentMethod === "upi" && (
              <div>
                <h2>UPI Details</h2>
                <Field type="text" name="contactNumber" placeholder="UPI ID" />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}

            <h2>Coupon Code</h2>
            <Field type="text" name="couponCode" placeholder="Coupon Code" />
            <ErrorMessage
              name="couponCode"
              component="div"
              className="text-danger"
            />
            <button type="button" onClick={() => alert("Coupon code applied!")}>
              Apply Coupon Code
            </button>

            <h2>Contact Details</h2>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />

            <Field
              type="email"
              name="receiptEmail"
              placeholder="Receipt Email"
            />
            <ErrorMessage
              name="receiptEmail"
              component="div"
              className="text-danger"
            />

            <button type="submit" className="btn btn-primary mt-3">
              Pay Now
            </button>
          </Form>
        )}
      </Formik>

    
      <div className="mt-4">
        <h3>Special Offers</h3>
        <ul>
          <li>
            <FontAwesomeIcon icon={faGift} /> Gift Offer
          </li>
          <li>
            <FontAwesomeIcon icon={faMoneyBillWave} /> Discounts from selected
            banks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentPage;
