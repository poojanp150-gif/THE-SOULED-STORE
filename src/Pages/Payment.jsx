import React, { useEffect, useState } from 'react'
import API from "./../Services/Api"
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate()
    const [totalamount, settotalamount] = useState({
        cartTotal: 0,
        gst: 0,
        totalAmount: 0
    })
    const [error, setError] = useState("")

    const [paymentMethod, setPaymentMethod] = useState("")

    const totaldata = async () => {
        const res = await API.get('/Paymentdata')
        const datas = res.data
        settotalamount(datas)
    }

    useEffect(()=>{
 window.scrollTo(0, 0);
    },[])

    const cleartCart = async () => {
       
        if (!paymentMethod) {
            setError("Please select a payment method")
            return
        }

        if (paymentMethod === "upi") {
            const upiInput = document.querySelector('input[placeholder="example@bank"]')
            if (!upiInput?.value) {
                setError("Please enter UPI ID")
                return
            }
        }

        if (paymentMethod === "card") {
            const cardNumber = document.querySelector('input[placeholder="Card Number"]')
            const expiry = document.querySelector('input[placeholder="MM/YY"]')
            const cvv = document.querySelector('input[placeholder="CVV"]')
            const name = document.querySelector('input[placeholder="Name on Card"]')

            if (
                !cardNumber?.value ||
                !expiry?.value ||
                !cvv?.value ||
                !name?.value
            ) {
                setError("Please fill all card details")
                return
            }
        }

        setError("")
        try {
            const res = await API.get('/cart')

            res.data.map((item) =>
                API.post("/order", {  productId: item.productId })
            )
            res.data.map(item =>
                API.delete(`/cart/${item.id}`),

            )



            const pay = await API.put("/Paymentdata", {
                cartTotal: 0,
                gst: 0,
                totalAmount: 0
            });
            settotalamount(pay.data);

            
            navigate("/Thankyouorder")
        } catch (error) {
            console.error('Error clearing cart:', error)
        }
    }


    useEffect(() => {
        totaldata()
    }, [])

    return (
        <div>
            <div className="container my-4 mb-5 ">
                <h5 className="text-center fw-bold mb-4 small" style={{ color: "#117a7a" }}>
                    MY BAG - - - - - - - - - - - - - ADDRESS  - - - - - - - - - - - - - PAYMENT
                </h5>
                <hr />

                <p>Delivery To</p>

                <div className="row g-4 justify-content-center">

                    <div className="col-12 col-lg-8 ">
                        <div className="payment-list">


                            <div
                                className={`payment-row ${paymentMethod === "upi" ? "active" : ""}`}
                                onClick={() => setPaymentMethod("upi")}
                            >
                                <div>
                                    <h6>Pay with any UPI App</h6>
                                </div>
                                <i className="bi bi-chevron-down"></i>
                            </div>

                            {paymentMethod === "upi" && (
                                <div className="payment-content">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="example@bank"
                                    />
                                    <small>Enter your UPI ID to proceed</small>
                                </div>
                            )}


                            <div
                                className={`payment-row ${paymentMethod === "card" ? "active" : ""}`}
                                onClick={() => setPaymentMethod("card")}
                            >
                                <div>
                                    <h6>Credit & Debit Cards</h6>
                                </div>
                                <i className="bi bi-chevron-down"></i>
                            </div>

                            {paymentMethod === "card" && (
                                <div className="payment-content">
                                    <input className="form-control mb-2" placeholder="Card Number" />
                                    <div className="d-flex gap-2">
                                        <input className="form-control" placeholder="MM/YY" />
                                        <input className="form-control" placeholder="CVV" />
                                    </div>
                                    <input className="form-control mt-2" placeholder="Name on Card" />
                                </div>
                            )}


                            <div className="payment-row disabled">
                                <h6>Netbanking</h6>
                                <span>▼</span>
                            </div>


                            <div className="payment-row disabled">
                                <div>
                                    <h6>CRED Pay</h6>
                                    <small>You’re not eligible for this payment option</small>
                                </div>
                                <input type="radio" disabled />
                            </div>


                            <div
                                className={`payment-row ${paymentMethod === "cod" ? "active" : ""}`}
                                onClick={() => setPaymentMethod("cod")}
                            >
                                <div>
                                    <h6>Cash on Delivery</h6>
                                    <small>We recommend prepaid payments</small>
                                </div>
                                <input type="radio" checked={paymentMethod === "cod"} readOnly />
                            </div>

                            {paymentMethod === "cod" && (
                                <div className="payment-content">
                                    <p>You will pay at the time of delivery.</p>
                                </div>
                            )}

                        </div>
                        {error && (
                            <p className="text-danger text-center fw-semibold mb-2">
                                {error}
                            </p>
                        )}

                    </div>


                    <div className="col-12 col-lg-4">
                        <div className='card shadow-sm  rounded-0 p-2 mb-2'>
                            <button className="btn btn-success w-100  rounded-1" type='submit' style={{ backgroundColor: "#117a7a" }}
                                onClick={() => navigate('/Address')} >
                                Back To Address
                            </button>
                        </div>
                        <div className="card shadow-sm rounded-0">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">PRICE DETAILS</h6>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Cart Total</span>
                                    <span>₹ {totalamount.cartTotal}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>GST (18%)</span>
                                    <span>₹ {Number(totalamount.gst).toFixed(2)}</span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total Amount</span>
                                    <span>₹ {totalamount.totalAmount}</span>
                                </div>

                                <button
                                    className="btn btn-success w-100 mt-3 rounded-1"
                                    type="submit"
                                    style={{ backgroundColor: "#117a7a" }} onClick={cleartCart}
                                >
                                    CONFIRM ORDER
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>
                {
                    `
                    .payment-list {
  border: 1px solid #e5e5e5;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.payment-row h6 {
  margin: 0;
  font-weight: 600;
}

.payment-row small {
  color: #777;
}

.payment-row.active {
  background: #f7fafa;
}

.payment-row.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.payment-content {
  padding: 15px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}

                    `
                }
            </style>
        </div>
    )
}
