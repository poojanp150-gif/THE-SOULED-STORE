import React, { useEffect, useState } from 'react'
import API from './../Services/Api'
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Sneakers() {
    const Snakerid = useNavigate()
    const [displaySnakers, setdisplaySnakers] = useState([])
    const [MenHigh, setMenHigh] = useState([])
    const [SOCKi, setSOCK] = useState([])
    const [catimg, setcatimg] = useState([
        
       {src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/shirts_87B485X.jpg?w=480&dpr=2",type: "Sneakers"},
      { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/2b_bcGZoNw.jpg?w=480&dpr=2",type: "Sneakers"},
     { src:  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/tshirts_Qq94UB0.jpg?w=480&dpr=2",type: "Sneakers"},
     { src:  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_5_copy_ePzhP4E.jpg?w=480&dpr=2",type: "Sneakers"},
     { src:  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/OFFICIAL_COLLABS_BoEXdAe.jpg?w=480&dpr=2",type: "Sneakers"},
     { src:  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/TSS_ORIGINALS__5jqGf21.jpg?w=480&dpr=2",type: "Sneakers"},
     { src:  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_4_Mu42HC1.jpg?w=480&dpr=2",type: "Sneakers"},
     {  src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_5_uK0q5YZ.jpg?w=480&dpr=2",type: "Sneakers"}
    ])
    useEffect(() => {
         AOS.init({ once: true });
         window.scrollTo(0, 0);
        displaydata()
          const handleScroll = () => {
                    AOS.refresh();
                };
         window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    const displaydata = (async () => {
        const res = await API.get('/products')
        const highSneakers = res.data.SNEAKERS.filter((item) => item.sub_category === "Men Low Top Sneakers")
        const MenHigh = res.data.SNEAKERS.filter((item) => item.sub_category === "Men High Top Sneakers")
        const SOCK = res.data.SNEAKERS.filter((item) => item.sub_category === "Socks")
        setdisplaySnakers(highSneakers)
        setMenHigh(MenHigh)
        setSOCK(SOCK)
    })
    const handleid = ((id) => {
        Snakerid(`/Singleproud/${id}`)
    })

     const handleClick = (value) => {
        Snakerid(`/filter/${value}`)
    }
    return (
        <div>
            <div className='container-fluid'>

                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                    data-bs-wrap="true"
                    data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500"
                >

                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="3"
                            aria-label="Slide 4"
                        ></button>
                    </div>


                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_1_u1yhwyT.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 1"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_Banner_copy_3_pP2L3hb.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 2"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/HP_FjIrL1x.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 3"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_copy_2_uAhkPHW.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 4"
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>

                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
                <div className='mt-3'>
                    <h3 className='text-center fw-bold mb-4' style={{ color: "#282c3f" }} data-aos="zoom-in"
     
     data-aos-offset="500"
     data-aos-duration="2000"  >Categories</h3>

                    <div className="row">

                        {
                            catimg.map((img, index) => (
                                <div className="col-12 col-sm-6 col-md-3" key={index} data-aos="fade-up" data-aos-delay="500" >
                                    <img src={img.src} alt="" className="img-fluid" onClick={() => handleClick(img.type)} style={{ cursor: "pointer" }}
                                     data-aos="flip-left"
                                data-aos-duration="1500"
                                data-aos-delay={index * 200}
                                    
                                    />
                                </div>
                            ))
                        }

                    </div>

                </div>

                <div className='mt-5'>
                    <h3 className='text-center fw-bold' style={{ color: "#282c3f" }} data-aos="zoom-in"   data-aos-duration="2500"
                                 >BEST IN UBZ</h3>
                    <h3 className='text-center mb-4 ' style={{ color: "#525964" }}  data-aos="zoom-in-up"   data-aos-duration="1500"
                                 >THE CULT FAVOURITE SILHOUETTE</h3>

                    <div className="row">
                        {
                            displaySnakers.map((Snaker) => (
                                <div key={Snaker.id} className="col-6 col-sm-3 col-md-3 " style={{ cursor: "pointer" }} onClick={() => handleid(Snaker.id)} 
                                
                                >

                                    <img src={Snaker.image} alt="" className="img-fluid rounded-5" data-aos="flip-left"
                                data-aos-duration="1500"
                                data-aos-delay={Snaker.id * 200} />
                                    <p className="mb-0 small fw-bold" style={{ color: '#585c70', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{Snaker.title}</p>
                                    <hr className="m-0" />
                                    <p className="mb-0 small" style={{ color: "#737577" }}>{Snaker.category}</p>
                                    <p className="mb-4 small fw-bold" style={{ color: "#58595b" }}>₹{Snaker.price}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <h3 className='text-center fw-bold' style={{ color: "#282c3f" }}  data-aos="zoom-in"   data-aos-duration="2500" >OFFICIAL COLLABS</h3>
                    <h3 className='text-center mb-4 ' style={{ color: "#525964" }} data-aos="zoom-in-up"   data-aos-duration="1500" >EXCLUSIVE LIMITED EDITION STYLES</h3>

                    <div className="row">
                        {
                            MenHigh.map((Snaker) => (
                                <div key={Snaker.id} className="col-6 col-sm-3 col-md-3 " style={{ cursor: "pointer" }} onClick={() => handleid(Snaker.id)}  
                                 data-aos="flip-right"
                                data-aos-duration="1500"
                                data-aos-delay={Snaker.id * 200}
                                >

                                    <img src={Snaker.image} alt="" className="img-fluid rounded-5" />
                                    <p className="mb-0 small fw-bold" style={{ color: '#585c70', whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis" }}>{Snaker.title}</p>
                                    <hr className="m-0" />
                                    <p className="mb-0 small" style={{ color: "#737577" }}>{Snaker.category}</p>
                                    <p className="mb-4 small fw-bold" style={{ color: "#58595b" }}>₹{Snaker.price}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <h3 className='text-center fw-bold mb-4' style={{ color: "#282c3f" }}data-aos="zoom-in-up"   data-aos-duration="1500" >SOCK IT UP</h3>

                    <div className="row">
                        {
                            SOCKi.map((Snaker) => (
                                <div key={Snaker.id} className="col-6 col-sm-3 col-md-3 " style={{ cursor: "pointer" }} onClick={() => handleid(Snaker.id)}
                                     data-aos="flip-left"
                                data-aos-duration="1500"
                                data-aos-delay={Snaker.id * 200}
                                >

                                    <img src={Snaker.image} alt="" className="img-fluid rounded-5" />
                                    <p className="mb-0 small fw-bold" style={{ color: '#585c70', whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis" }}>{Snaker.title}</p>
                                    <hr className="m-0" />
                                    <p className="mb-0 small" style={{ color: "#737577" }}>{Snaker.category}</p>
                                    <p className="mb-4 small fw-bold" style={{ color: "#58595b" }}>₹{Snaker.price}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5 mb-3'>
                    <h3 className='text-center fw-bold mb-4' style={{ color: "#282c3f" }} data-aos="zoom-in"   data-aos-duration="2500" >HEAR IT FROM THE COMMUNITY</h3>

                    <div className="row "   data-aos="fade-up"
     data-aos-duration="3000">
                        <div className="col-12  col-md-4 mb-3">
                            <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/collection_tiles_copy_000sdch.jpg?w=480&dpr=2" alt="" className="img-fluid" />
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                            <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/collection_tiles2_copy_qGmUc7L.jpg?w=480&dpr=2" alt="" className="img-fluid" />
                        </div>
                        <div className="col-12 col-md-4">
                            <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/collection_tiles3_copy_1_g024eSa.jpg?w=480&dpr=2" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
