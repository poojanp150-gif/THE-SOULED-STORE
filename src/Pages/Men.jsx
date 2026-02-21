import React, { useState } from "react";
import API from '../Services/Api'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Men() {
    
    const [message, setmessage] = useState()
    const [showMessage, setShowMessage] = useState(false);
    const [Main_Clouths, setMainClothes] = useState([])
    const Cloathid = useNavigate();
    const [liked, setLiked] = useState([]);
    const [activeCategory, setActiveCategory] = useState("ALL");
    var navigate = useNavigate();
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
    }, [activeCategory]);
    const apiCall = async () => {
        const res = await API.get("/products");

        setMainClothes(res.data.men);
    };

    const filteredProducts = activeCategory === "ALL" ? Main_Clouths : Main_Clouths.filter((item) => item.category === activeCategory);

    const categories = [
        "ALL",
        "Hoodies",
        "Jackets",
        "Oversized T-Shirts",
        "Shirt",
        "Polos",
        "Men Pants",
        "Men Jeans",
    ]




    const handleid = ((id) => {
        Cloathid(`/Singleproud/${id}`)
    })

    const loadLiked = async () => {
        const res = await API.get("/wishlistProduct");
        setLiked(res.data.map(item => item.productId));
    }


    const handleheart = async (e, id) => {
        e.stopPropagation();
        const Login = await API.get("/Login")

        if (Login.data && Login.data.email) {

            if (liked.includes(id)) {

                const res = await API.get("/wishlistProduct");

                const itemToDelete = res.data.find(
                    (item) => item.productId === id
                );

                if (itemToDelete) {
                    await API.delete(`/wishlistProduct/${itemToDelete.id}`);
                }

                setLiked((prev) => prev.filter((litem) => litem !== id));
                setmessage("Remove For Wishlist");
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);

            } else {

                await API.post('/wishlistProduct', { productId: id });
                setLiked((prev) => [...prev, id]);
                setmessage("Add To Wishlist");
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
            }

        } else {
            navigate('/Login');
        }
    };
    const images = [
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/tshirts_VSzPgIz.jpg?w=480&dpr=2", type: "T-shirts" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/shirts_zxYUuSO.jpg?w=480&dpr=2", type: "Shirt" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/tops_lFv4BrQ.jpg?w=480&dpr=2", type: "jackets" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/jacket_Iem0Z03.jpg?w=480&dpr=2", type: "Men Pants" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/jeans_gxINNMt.jpg?w=480&dpr=2", type: "Men Jeans" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/dresses__jumpsuits_RrY4qT2.jpg?w=480&dpr=2", type: "T-shirts" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/pants_lansS3W.jpg?w=480&dpr=2", type: "Men Jeans" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/sneaker_kg90oSN.jpg?w=480&dpr=2", type: "Sneakers" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/access_Bv0PYBR.jpg?w=480&dpr=2", type: "Sneakers" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_3_hyZ3M6m.jpg?w=480&dpr=2", type: "Men Jeans" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_1_7e4OJFJ.jpg?w=480&dpr=2", type: "socks" },
        { src: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Artboard_2_NlWcwDO.jpg?w=480&dpr=2", type: "Men Jeans" },
    ];
    const handleClick = (value) => {
        navigate(`/filter/${value}`)
    }

    return (
        <div >


            <div className='container-fluid position-relative'>
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
                    data-bs-wrap="true"  data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500">
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
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Home_Page_Banner_zQKsof0.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 1"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/LP_mic_homepage.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 2"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_3_4TAgtAR.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 3"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_bn9tun7.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 4"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/HP_cgcGzP1.jpg?w=1500&dpr=2"
                                className="d-block w-100"
                                alt="Slide 5"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/nebula_backpack_homepage.jpg?w=1500&dpr=2"
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
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className='mt-5 '>
                    <h3 className='text-center fw-bold mb-4' style={{ color: "#282c3f" }}  data-aos="zoom-in" data-aos-duration="2000">NEW IN: COLLECTIONS</h3>
                    <div id="carouselExample" className="carousel slide" >
                        <div className="carousel-inner" data-aos="zoom-in"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="2000">
                            <div className="carousel-item active">
                                <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_1_ZCQmjN3.jpg?w=1500&dpr=2" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Korean_Home_Page_Banner_NIWSOfT.jpg?w=1500&dpr=2" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_-_Year_end_party_edit__copy_2_oaYaxuH.jpg?w=1500&dpr=2" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='mt-3'>
                    <h3 className='text-center fw-bold mb-4' style={{ color: "#282c3f" }}>Categories</h3>
                    <div className="row" data-aos="fade-up" data-aos-delay="500">
                        {images.map((item, index) => (
                            <div className="col-6 col-sm-6 col-md-3 mb-3" key={index} >
                                <img src={item.src} alt={`product`} className="img-fluid" onClick={() => handleClick(item.type)} style={{ cursor: "pointer" }} 
                                 data-aos="flip-left"
                                data-aos-duration="1500"
                                data-aos-delay={index * 200} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-5 mb-5 '>
                    <div className="d-flex gap-3 ms-2 overflow-auto" style={{ whiteSpace: "nowrap" }}  data-aos="fade-up" data-aos-duration="1500"  >
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
                            <div key={cloatch.id} className="col-6 col-sm-6 col-md-3 " style={{ cursor: "pointer" }}
                                onClick={() => handleid(cloatch.id)} data-aos="fade-up" data-aos-duration="1200"  >
                                <div className="position-relative">
                                    <img src={cloatch.image} alt="" className="img-fluid" />
                                    <h5 className="position-absolute top-0 end-0  p-2 py-1 mt-1 mt-sm-3 me-1 me-sm-3 rounded-5 custom-heart"
                                        style={{ backgroundColor: liked.includes(cloatch.id) ? "white" : "rgba(0,0,0,0.5)" }}

                                        onClick={(e) => { handleheart(e, cloatch.id); setShowMessage(false); }}
                                    >
                                        <i className={`bi ${liked.includes(cloatch.id) ? "bi-heart-fill" : "bi-heart"}`}
                                            style={{ color: liked.includes(cloatch.id) ? "#117a7a" : "white" }} ></i>
                                    </h5>
                                </div>
                                <p className="mb-0 small fw-bold" style={{ color: '#585c70', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cloatch.title}</p>
                                <hr className="m-0" />
                                <p className="mb-0 small" style={{ color: "#737577" }}>{cloatch.category}</p>
                                <p className="mb-4 small fw-bold" style={{ color: "#58595b" }}>₹{cloatch.price}</p>
                            </div>
                        ))
                    }
                </div>


            </div>
                    
        </div>
    );
}
