import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from './../Services/Api'
import { useNavigate } from "react-router-dom";


export default function Searchbar() {
    const productpage=useNavigate()
    const {value}=useParams()
    

    const[displayproduct,setDisplayProduct]=useState([])

    const handlesearch=(async()=>{
        
        const mendata= await API.get('/products')

       const MenssData= mendata.data.men.filter((a)=>a.title.toLowerCase().includes(value.toLowerCase()))
       const womenData= mendata.data.women.filter((a)=>a.title.toLowerCase().includes(value.toLowerCase()))
       const snakerData= mendata.data.SNEAKERS.filter((a)=>a.title.toLowerCase().includes(value.toLowerCase()))
        if(value){
           if(MenssData || womenData || snakerData){
           setDisplayProduct([...MenssData, ...womenData,...snakerData]);
           }
        }
    })
    useEffect(()=>{
        handlesearch()
         window.scrollTo(0, 0);
    },[value])

    const SingleProductPage=((id)=>{
        productpage(`/Singleproud/${id}`)
    })
  return (
    <div>

        <div className='container-fluid'>
              <h5 className="mb-3 fw-bold">Search results for "{value}"</h5>
                     {displayproduct.length === 0 &&
                <div className="text-center py-5">
                    <img 
                        src="https://prod-img.thesouledstore.com/static/emptyCart.png?w=200&dpr=2" 
                        alt="No Products Found" 
                        className="img-fluid mb-3" 
                        style={{ maxHeight: "150px" }} 
                    />
                    <h4 className="fw-bold mb-2">No products found</h4>
                    <p className="text-muted">
                        Sorry, we couldn’t find any products matching  <span className='fw-bold'>"{value}"</span> . Try different keywords.
                    </p>
                </div>
            
        }
            <div className='row'>
                {
                    displayproduct.map((cloatch)=>(
                        <div key={cloatch.id} className="col-12 col-sm-6 col-md-3" style={{ cursor: "pointer" }} onClick={()=>SingleProductPage(cloatch.id)}>
                            
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
  )
}
