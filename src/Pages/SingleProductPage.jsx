import React, { Children, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Services/Api'
import Navbar from '../Navbar'
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
export default function SingleProductPage() {
  const { id } = useParams()
  useEffect(() => {
    AOS.init({
        duration: 2000, 
       once: true
    });
     window.scrollTo(0, 0); 
  }, [id]);
  const [product, setProduct] = useState(null)
  const idnotfound = useNavigate()
  const loginnavigate = useNavigate()
  const [CardData, setCardData] = useState({
    size: '',
    quantity: ""
  })
  const [like, setlike] = useState([])
  const [message, setmessage] = useState()
  const [showMessage, setShowMessage] = useState(false);
  const Likedata = async () => {
    const likedata = await API.get("/wishlistProduct")
    setlike(likedata.data.map(item => item.productId))
  }
  useEffect(() => {
    fetchProduct()
    Likedata()
  }, [id])
  const fetchProduct = async () => {
    const res = await API.get('/products')

    const allProducts = [
      ...res.data.men,
      ...res.data.women,
      ...res.data.SNEAKERS
    ]
    const productId = Number(id)
    const foundProduct = allProducts.find(p => p.id === productId)

    setProduct(foundProduct)
  }


  if (!product) {
    return idnotfound('*')
  }

  const handleCartdata = async () => {
    const Login = await API.get("/Login")

    if (Login.data && Login.data.email) {
      if (!CardData.size) {
        setmessage("Please select size")
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000)
        return
      } else if (!CardData.quantity) {
        setmessage("Please select Quantity")
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000)
        return
      }

      const cartRes = await API.get("/cart")

      const existingItem = cartRes.data.find(
        (item) =>
          Number(item.id) === Number(id) &&
          item.size === CardData.size
      )
      
      if (existingItem) {
        await API.patch(`/cart/${existingItem.id}`, {
          quantity: Number(existingItem.quantity) + Number(CardData.quantity)

        })
        
        setmessage("Cart Updated")

      } else {
        const CartData = {
          productId: Number(id),
          size: CardData.size,
          quantity: Number(CardData.quantity)
        }
        await API.post('/cart', CartData)
        setmessage('Added to cart')

      }

      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000)
      setCardData({ size: '', quantity: "" })
    } else {
      loginnavigate('/Login')
    }
  }



  const handlelike = async (productId) => {

    const Login = await API.get("/Login")

    if (Login.data && Login.data.email) {

      const res = await API.get("/wishlistProduct")

      const existingItem = res.data.find(
        item => item.productId === productId
      )

      if (existingItem) {

        // Remove
        await API.delete(`/wishlistProduct/${existingItem.id}`)

        setlike(prev => prev.filter(id => id !== productId))
        setmessage("Remove From Wishlist")

      } else {

        // Add
        await API.post('/wishlistProduct', { productId })

        setlike(prev => [...prev, productId])
        setmessage("Add To Wishlist")
      }

      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000)

    } else {
      loginnavigate('/Login')
    }
  }

  return (
    <div>
      <div className="container-fluid px-3 px-md-5 mt-4 position-relative">
        {message && (
          <h5
            id="addMessage"
            className={showMessage ? "show bg-danger text-white top-10" : ""}
          >
            {message}
          </h5>
        )}

        <div className="row">
          <div className="col-12 col-md-7">
            <div className="row g-3">


              <div className="d-none d-sm-flex row g-3" >
                {product.images.map((imgUrl, index) => (
                  <div key={index} className="col-6">
                    <img
                      src={imgUrl}
                      className="img-fluid"
                      alt={`Product ${index}`} data-aos="flip-left"  data-aos-delay={index * 300}
                    />
                  </div>
                ))}
              </div>


              <div className="d-block d-sm-none">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-interval="3000"
                >


                  <div className="carousel-indicators">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>


                  <div className="carousel-inner">
                    {product.images.map((imgUrl, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img
                          src={imgUrl}
                          className="d-block w-100"
                          alt={`Slide ${index}`}
                        />
                      </div>
                    ))}
                  </div>


                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      style={{ filter: "invert(1)" }}
                    />
                  </button>


                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    
                    <span className="carousel-control-next-icon"  style={{ filter: "invert(1)" }} />
                  </button>

                </div>
              </div>

            </div>

          </div>
          <div className="col-12 col-md-5 mt-4 mt-md-0">
            <h2 className='mb-0 fw-bold' style={{ color: "#58595b" }} data-aos="zoom-in-up" >{product.title}</h2>
            <p className='small fw-semibold' style={{ color: "#aaaaac" }} data-aos="zoom-in-up">{product.sub_category}</p>
            <hr />
            <h4 className='fw-bold mb-1' style={{ color: "#58595b" }} data-aos="zoom-in-down" >₹ {product.price}</h4>
            <p className='small ' style={{ color: "#aaaaac" }} data-aos="zoom-in-down" >Price incl. of all taxes</p>


            <p className="fw-bold" style={{ color: "#58595b" }}>Please select a size</p>
            <div className="d-flex flex-wrap gap-2 mb-3"  data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2500" >
              {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                <button
                  key={size} 
                  className={`btn px-3 ${CardData.size === size ? "btn-secondary" : "btn-outline-secondary"}`} 
                  onClick={() => {
                    setCardData(prev => ({ ...prev, size }))
                    setShowMessage(false)
                  }} 
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="mb-3">
              <label className="fw-semibold me-2" style={{ color: "#58595b" }}  data-aos="flip-up" >Quantity</label>
              <select
                className="form-select w-auto d-inline"
                value={CardData.quantity}
                onChange={(e) => {
                  setCardData(prev => ({
                    ...prev,
                    quantity: Number(e.target.value)
                  })) 
                }}   data-aos="flip-up"  >
                <option value="">Select Quantity</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
              </select>
            </div>
            <p className='small' style={{ color: "#299ab5" }} data-aos="fade-up-left" >We recommend buying one size smaller for a regular fit</p>
            <div className="d-flex gap-2">
              <button className="btn btn-danger rounded-0 px-5" onClick={handleCartdata} data-aos="fade-down-right" >
                ADD TO CART
              </button>


              <button
                className="btn btn-outline-dark rounded-0"
                style={{ color: "#299ab5" }}
                onClick={() => { handlelike(Number(id)); setShowMessage(false); }} data-aos="fade-down-left"
              >
                {like.includes(Number(id)) ? "♥ REMOVE FROM WISHLIST" : "♡ ADD TO WISHLIST"}
              </button>
            </div>
            <div className='mt-3'>
              <p>Share <i className="ms-2 fs-5 bi bi-whatsapp"></i>
                <a href="https://www.facebook.com/souledstore/" target="_blank">
                  <i className="ms-2 me-2 fs-5 bi bi-facebook text-black"></i></a>
                <a href="https://x.com/thesouledstore?lang=en" target="_blank">
                  <i className="bi bi-twitter fs-5 text-black"></i>
                </a>
                <a href="https://www.instagram.com/thesouledstore/?hl=en" target="_blank">
                  <i className="fs-5 ms-2 bi bi-instagram text-black"></i></a>
              </p>
            </div>
            <h6 className="fw-bold" data-aos="fade-up" >Delivery Details</h6>
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Pincode" data-aos="fade-up"
              />
              <button className="btn btn-outline-secondary" data-aos="fade-down-right" >
                CHECK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
