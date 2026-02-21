import React, { useEffect, useState } from 'react'
import API from './../Services/Api'
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Cart() {
  
  useEffect(() => {
      AOS.init({  duration: 2000, 
       once: true });
    displaydata()
    window.scrollTo(0, 0);
  }, [])
  const [Cartdata, setCartdata] = useState([])
  const Navigate = useNavigate()
  const Address = useNavigate()

  const displaydata = (async () => {
    const cartDatas = await API.get('/cart')
    const productData = await API.get("/products")

    const finaldata = cartDatas.data.map((cart) => {
      const product =
        productData.data.men.find((prodata) => prodata.id === Number(cart.productId)) ||
        productData.data.women.find((prodata) => prodata.id === Number(cart.productId)) ||
        productData.data.SNEAKERS.find((prodata) => prodata.id === Number(cart.productId))


      return {
        ...product,
        size: cart.size ? cart.size : "M",
        quantity: cart.quantity !== undefined && cart.quantity !== null ? Number(cart.quantity) : 1,
        cartId: cart.id,
      }
    })
    setCartdata(finaldata)
  })

  const Deletdata = (async (id) => {
    await API.delete(`cart/${id}`)
    displaydata()
  })

  const handleQuantityChange = ((cartId, value) => {
    setCartdata((prev) =>
      prev.map((item) => item.cartId == cartId ? { ...item, quantity: Number(value) } : item))
    API.patch(`/cart/${cartId}`, { quantity: value });
  })

  const handlesizeChange = ((cartId, value) => {
    setCartdata((prev) =>
      prev.map((item) => item.cartId == cartId ? { ...item, size: value } : item))
    API.patch(`/cart/${cartId}`, { size: value })
  })


  let total = 0

  Cartdata.forEach(item => {
    total += item.price * item.quantity
  })

  const cartTotal = total
  const gst = cartTotal * 0.18
  const totalAmount = cartTotal + gst

  const PlaceAddress = (async () => {
    const cartTotal = total
    const gst = cartTotal * 0.18
    const totalAmount = cartTotal + gst
    await API.patch("/Paymentdata", {
      cartTotal,
      gst,
      totalAmount
    })
    Address('/Address')
  })
  return (
    <div className="container my-4 mb-5 ">


      <h5 className="text-center fw-bold mb-4 small">
        <span style={{ color: "#117a7a" }} data-aos="fade-down"
      >MY BAG</span> - - - - - - - - - - - - - ADDRESS  - - - - - - - - - - - - - PAYMENT
      </h5>
      <hr />
      {Cartdata.length <= 0 &&
        <div className="container">
          <div className="row justify-content-center align-items-center p-5 text-center">
            <div className="col-12 col-md-8 col-lg-6">
              <img
                src="https://prod-img.thesouledstore.com/static/emptyCart.png?w=200&dpr=2"
                alt="Empty Wishlist"
                className="img-fluid mb-4"
                style={{ maxHeight: "220px" }}
              />
              <h4 className="fw-bold mb-2">
                Your shopping cart is empty.
              </h4>
              <p className="text-muted mb-4">
                Please add something soon, carts have feelings too.
              </p>
              <button className="btn btn-outline-success px-4 py-2 fw-bold" onClick={() => Navigate('/')}>
                CONTINUE SHOPPING
              </button>

            </div>
          </div>
        </div>

      }
      <div className="row g-4 justify-content-center" >

        <div className="col-12 col-lg-6 "data-aos="fade-up" >
          {Cartdata.map((item) => (
            <div key={item.cartId} className="card mb-3 shadow-sm rounded-0 shadow-sm">
              <div className="row g-0 align-items-center p-2 position-relative" data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" >

                <div className="col-4 col-md-3 ">
                  <img
                    src={item.image}
                    className="img-fluid  rounded-2"
                    alt={item.title}
                  />
                </div>


                <div className="col-8 col-md-9">
                  <div className="card-body ">

                    <h6 className="fw-bold mb-1">{item.title}</h6>
                    <p className="text-muted small mb-2">{item.category}</p>

                    <div className="d-flex flex-wrap gap-3 mb-2">

                      <div>
                        <label className="small fw-semibold me-2">Size</label>
                        <select
                          className="form-select form-select-sm d-inline w-auto"
                          value={item.size}
                          onChange={(e) =>
                            handlesizeChange(item.cartId, e.target.value)
                          }
                        >
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>

                        </select>

                      </div>


                      <div className='mb-2'>
                        <label className="small fw-semibold me-2">Qty</label>
                        <select
                          className="form-select form-select-sm d-inline w-auto"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.cartId, e.target.value)
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                    <p className=" p-2 mb-0 position-absolute top-0 end-0 text-end">
                      ₹ {item.price * item.quantity} <br />
                      <span className=' d-none d-md-block'>MRP incl. of all taxes</span>
                    </p>

                    <hr />
                    <div className='text-end '>
                      <button
                        className="btn btn-sm me-3 border px-3 rounded-3 fw-bold" onClick={() => Deletdata(item.cartId)} > Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {
          Cartdata.length > 0 &&
          <div className="col-12 col-lg-4" data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
      >
            <div className="card shadow-sm sticky-top rounded-0 z-0" style={{ top: "80px" }}>
              <div className="card-body">
                <h6 className="fw-bold mb-3">PRICE DETAILS</h6>

                <div className="d-flex justify-content-between mb-2">
                  <span>Cart Total</span>
                  <span>₹ {cartTotal}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>GST (18%)</span>
                  <span>₹ {gst.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total Amount</span>
                  <span>₹ {totalAmount.toFixed(2)}</span>
                </div>

                <button className="btn btn-success w-100 mt-3" onClick={() => PlaceAddress()}>
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
