import React, { useEffect, useState } from 'react'
import Navbar from './../Navbar'
import API from './../Services/Api'
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {

  const[display,setdisplay]=useState([])
  useEffect(()=>{
    displayproduct()
     window.scrollTo(0, 0);
  },[])

  const Productid = useNavigate();
  const displayproduct=( async()=>{
      const men= await API.get('/products')
      const datamen=men.data.men
      const datawomen=men.data.women
setdisplay([...datamen, ...datawomen])
  })

     const handleid=((id)=>{
        Productid(`/Singleproud/${id}`)
    })
  return (
    <>
      <div>
        
        <div className='container-fluid'>
            <div className='mt-1 d-flex flex-column justify-content-center align-items-center ' style={{background:"#f7f7f7"}}>
              <img src="https://prod-img.thesouledstore.com/static/notfound.png?w=376&dpr=2" alt="" width={"400px"} />
              <h4 className='mb-5' style={{color:"#aaaaac"}}>Looks like this product is unavailable. Explore more awesome products on our website!</h4>
            </div>
             <div className="row mt-3">
                    {
                        display.map((cloatch) => (
                            <div key={cloatch.id} className="col-12 col-sm-6 col-md-3" style={{ cursor: "pointer" }} onClick={()=>handleid(cloatch.id)}>
                                <img src={cloatch.image} alt="" className="img-fluid " />
                                <p className="mb-0 small fw-bold" style={{ color: '#585c70' }}>{cloatch.title}</p>
                                <hr className="m-0" />
                                <p className="mb-0 small" style={{ color: "#737577" }}>{cloatch.category}</p>
                                <p className="mb-4 small fw-bold" style={{ color: "#58595b" }}>₹{cloatch.price}</p>
                            </div>
                        ))
                    }
                </div>
        </div>
      </div>
    </>
  )
}
