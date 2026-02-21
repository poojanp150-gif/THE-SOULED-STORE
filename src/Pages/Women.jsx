import React, { useState, useEffect } from 'react'
import Navbar from './../Navbar'
import API from './../Services/Api'
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Women() {
    const [Main_Clouths, setMainClothes] = useState([])
 const [message, setmessage] = useState()
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
         AOS.init({ once: true });
        apiCall()
        window.scrollTo(0, 0);
        loadLiked()
          const handleScroll = () => {
                    AOS.refresh();
                };
        
                window.addEventListener("scroll", handleScroll);
        
                return () => {
                    window.removeEventListener("scroll", handleScroll);
                };
    }, [])
    const apiCall = async () => {
        const res = await API.get("/products");

        setMainClothes(res.data.women);
    }
    const [activeCategory, setActiveCategory] = useState("ALL");
    const filteredProducts = activeCategory === "ALL" ? Main_Clouths : Main_Clouths.filter((item) => item.category === activeCategory);
    const categories = [
        "ALL",
        "Women Knitted Sweaters",
        "Women Hoodies",
        "Women T-Shirts",
        "Women Shirts",
        "Women Jeans",
        "Women Pants",
        "Women Cropped Tops",
        "Women Sweatshirts",
        "Women Low Top Sneakers",

    ];
    const Productid = useNavigate();

    const handleid = ((id) => {
        Productid(`/Singleproud/${id}`)
    })
    const [liked, setLiked] = useState([]);
    const loadLiked = async () => {
        const res = await API.get("/wishlistProduct");
        setLiked(res.data.map(item => item.productId));
    }

    const handleheart = async (e, productId) => {
        e.stopPropagation();
        const Login = await API.get("/Login")

        if (Login.data && Login.data.email) {
            const res = await API.get("/wishlistProduct");

            const existingItem = res.data.find(
                item => item.productId === productId
            );
            if (existingItem) {
                await API.delete(`/wishlistProduct/${existingItem.id}`)
                setLiked((prev) => prev.filter((litem) => litem !== productId));
               setmessage("Remove For Wishlist");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
            } else {
                await API.post('/wishlistProduct', { productId })
                setLiked((prev) => [...prev, productId]);
                setmessage("Add To Wishlist");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
            }
        } else {
            navigate('/Login');
        }
    };
    const images = [
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_copy_5-3_yafAW6d.jpg?w=480&dpr=2", type: "Women Shirts" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_copy_5-2_4l4B76A.jpg?w=480&dpr=2", type: "Women Hoodies" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_copy_5-1_tNyjxFM.jpg?w=480&dpr=2", type: "Women T-Shirts" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_copy_4_I2tHEe9.jpg?w=480&dpr=2", type: "Women Jeans" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_RqyxTig.jpg?w=480&dpr=2", type: "Women Cropped Tops" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/2_kZwYxPf.jpg?w=480&dpr=2", type: "Women Pants" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_copy_3_nX8T05G.jpg?w=480&dpr=2", type: "socks" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Winter_Edit__25_copy_wJkQFsj.jpg?w=480&dpr=2", type: "Women Sweatshirts" }
    ]
    const handleClick = ((value) => {
        Productid(`/filter/${value}`)
    })
    return (
        <div>
            <div className='container-fluid'>
                 {message && (
                    <h5
                        id="addMessage"
                        className={showMessage ? "show bg-danger text-white top-10" : ""}
                    >
                        {message}
                    </h5>
                )}

                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                    data-bs-wrap="true"   data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500"
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
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="4"
                            aria-label="Slide 5"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="5"
                            aria-label="Slide 6"
                        ></button>
                    </div>


                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_tJd56m5.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 1"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_10_copy_1.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 2"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_58.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 3"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_1_8sVnJSf.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 4"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/hp_48sjNOX.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 5"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/bottomwear_homepage.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 6"
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
                    <h3 className='text-center fw-bold mb-4' style={{ color: "#282c3f" }}  data-aos="zoom-in" data-aos-duration="2000"  >Categories</h3>

                    <div className="row"  data-aos="fade-up" data-aos-delay="500" >
                        {images.map((item, index) => (
                            <div className="col-12 col-sm-6 col-md-3 mb-3" key={index} >
                                <img src={item.src} alt={`product`} className="img-fluid" onClick={() => handleClick(item.type)} style={{ cursor: "pointer" }} 
                                  data-aos="flip-left"
                                data-aos-duration="1500"
                                data-aos-delay={index * 200}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-5 mb-5 '>
                    <div className="d-flex gap-3 ms-2 overflow-auto" style={{ whiteSpace: "nowrap" }}  data-aos="fade-up" data-aos-duration="1500"    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-4 py-1 rounded-3  border-1 btn btn-sm btn-outline-dark ${activeCategory === cat ? "active" : ""
                                    }`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <hr />
                </div>
                <div className="row">
                    {
                        filteredProducts.map((cloatch) => (
                            <div key={cloatch.id} className="col-6 col-sm-6 col-md-3" style={{ cursor: "pointer" }} onClick={() => handleid(cloatch.id)} data-aos="fade-up" data-aos-duration="1200"  >

                                <div className="position-relative">
                                    <img src={cloatch.image} alt="" className="img-fluid " />
                                   <h5 className="position-absolute top-0 end-0  p-2 py-1 mt-1 mt-sm-3 me-1 me-sm-3 rounded-5 custom-heart"
                                        style={{ backgroundColor: liked.includes(cloatch.id) ? "white" : "rgba(0,0,0,0.5)" }}

                                        onClick={(e) => { handleheart(e, cloatch.id); setShowMessage(false); }}
                                    >
                                        <i className={`bi ${liked.includes(cloatch.id) ? "bi-heart-fill" : "bi-heart"}`}
                                            style={{ color: liked.includes(cloatch.id) ? "#117a7a" : "white" }} ></i>
                                    </h5>

                                </div>
                                <p className="mb-0 small fw-bold" style={{ color: '#585c70', whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis" }}>{cloatch.title}</p>
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
