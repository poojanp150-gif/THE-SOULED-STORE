import React, { useEffect, useState } from 'react'
import API from './../Services/Api'
import Navbar from '../Navbar';
import { useNavigate } from "react-router-dom";

export default function Wishlist() {


  const Navigate = useNavigate()
  const CardNavigate = useNavigate()
  const [whishidata, setwhishidata] = useState([])

  const displaydata = async () => {

    const wishRes = await API.get("/wishlistProduct")
    const productRes = await API.get("/products")

    const finalData = wishRes.data.map(wish => {
      const product = productRes.data.men.find( prod => prod.id === wish.productId ) ||
        productRes.data.women.find(prod => prod.id === wish.productId) ||
    productRes.data.SNEAKERS.find(prod => prod.id === wish.productId);
    
      return {
        ...product,
        wishlistId: wish.id,
         productId: wish.productId  
      }
    })

    setwhishidata(finalData)
  }
  const removeFromWishlist = async (e,wishlistId) => {
     e.stopPropagation();
    await API.delete(`/wishlistProduct/${wishlistId}`)
    setwhishidata(prev =>prev.filter(item => item.wishlistId !== wishlistId)
    )
  }


  useEffect(() => {
    displaydata()
     window.scrollTo(0, 0);
  }, [])
  const handlecart = (async (wishlistId,productId) => {
    
    await API.delete(`/wishlistProduct/${wishlistId}`)
    await API.post(`/cart`, { productId  })
    CardNavigate('/Cart')
  })
  return (
    <>
      <div className="container my-4">
        {whishidata.length <= 0 &&
          <div className="container">
            <div className="row justify-content-center align-items-center  text-center">
              <div className="col-12 col-md-8 col-lg-6">
                <img
                  src="https://prod-img.thesouledstore.com/static/wishList-empty-icon.png?w=1100&dpr=2"
                  alt="Empty Wishlist"
                  className="img-fluid mb-4"
                  style={{ maxHeight: "220px" }}
                />
                <h4 className="fw-bold mb-2">
                  Your wishlist is lonely and looking for love.
                </h4>
                <p className="text-muted mb-4">
                  Add products to your wishlist, review them anytime and easily move to cart.
                </p>


                <button className="btn btn-outline-success px-4 py-2 fw-bold" onClick={() => Navigate('/')}>
                  CONTINUE SHOPPING
                </button>

              </div>
            </div>
          </div>

        }
        {
          whishidata.length > 0 &&
          <h5 className="mb-4 fw-bold">
            My Wishlist ({whishidata.length} items)
          </h5>
        }
        <div className="row">
          {whishidata.map((item) => (
            <div key={item.wishlistId} className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card wishlist-card h-100 position-relative">
                <button
                  className="btn py-1 px-2 btn-light position-absolute top-0 end-0 m-2 rounded-circle opacity-75"
                  onClick={(e) => removeFromWishlist(e,item.wishlistId)}
                >
                  <i className="bi bi-x fs-6 fs-md-5"></i>
                </button>



                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  onClick={()=>Navigate(`/Singleproud/${item.id}`)}
                  style={{cursor:"pointer"}}
                  />


                <div className="card-body p-3">
                  <p className="fw-bold mb-1" style={{ whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"}}>{item.title}</p>
                  <p className="text-muted small mb-1">{item.category}</p>
                  
                 
                  <p className="fw-bold mb-2">₹ {item.price}</p>
                </div>


              <div className="card-footer bg-white d-flex justify-content-center">
  <button
    className="btn btn-link fw-bold text-success text-decoration-none text-nowrap btn-sm"
    onClick={() => handlecart(item.wishlistId, item.productId)}
  >
    MOVE TO CART
  </button>
</div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

