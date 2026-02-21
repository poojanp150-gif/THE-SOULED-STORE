import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankyouPage() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-sm border-0 text-center p-4 p-md-5" style={{ maxWidth: "500px" }}>
        
        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#117a7a",
            color: "#fff",
            fontSize: "36px"
          }}
        >
          ✓
        </div>

        <h3 className="fw-bold mb-2">Thank You for Your Order!</h3>
        <p className="text-muted mb-4">
          Your order has been placed successfully.  
          We’ll notify you once it’s shipped.
        </p>

        <div className="border rounded-3 p-3 mb-4 bg-light">
          <p className="mb-1 fw-semibold">Estimated Delivery</p>
          <p className="text-muted small mb-0">Within 3 - 5 business days</p>
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn text-white"
            style={{ backgroundColor: "#117a7a" }}
            onClick={() => navigate("/")}
          >
            CONTINUE SHOPPING
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/Daskbord")}
          >
            VIEW MY ORDERS
          </button>
        </div>
        <p
  className="mt-4 small d-flex justify-content-center align-items-center gap-2"
  style={{ cursor: "pointer", color: "#117a7a" }}
  onClick={() => navigate("/FAQ")}
>
  <i className="bi bi-headset"></i>
  Need help? Contact our support anytime.
</p>

      </div>
    </div>
  )
}
