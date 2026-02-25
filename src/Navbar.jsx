import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import API from './Services/Api'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Navbar() {
 useEffect(() => {
  AOS.init();
}, []);


    const [likedata, setlikedata] = useState(0)
    const [cart, setcart] = useState([])

    useEffect(() => {
        checkcartlen()
    })

    const checkcartlen = (async () => {
        let cartdata = await API.get("/cart")
        setcart(cartdata.data)
    })



    useEffect(() => {
        checklikelength()

    },[likedata])
    useEffect(() => {
        Adminselect()
    })
    const checklikelength = (async () => {
        let likel = await API.get("/wishlistProduct")
        
        setlikedata(likel.data)
    })


    const inputRef = useRef(null);
    const Searchnavigate = useNavigate();
    const handleKeyPress = (e) => {

        if (e.key === "Enter") {

            const value = inputRef.current.value.trim();
            if (value !== "") {
                Searchnavigate(`/search/${value}`);
            }
        }
    }
    const [radioselect, setradioselect] = useState(null)



    const [fname, setfname] = useState("")

    const Adminselect = (async () => {
        const res = await API.get("/Login")
        const radioselect = res.data.radioselect

        setradioselect(radioselect)
        const name = res.data.fname + res.data.lname
        setfname(name)
    })

    const [showMobileSearch, setShowMobileSearch] = useState(false)
    // const handleprofillogin = (() => {
    //     if (radioselect == null) {
    //         Searchnavigate("/Login")
    //     } else {
    //         Searchnavigate("/Daskbord")
    //     }
    // })
    const Logout = async () => {
        const res = await API.get('/cart')
        const wiis = await API.get('/wishlistProduct')
        const order = await API.get('/order')
        await API.put('/Login', {})

        order.data.map(item =>
            API.delete(`/order/${item.id}`),

        )
        wiis.data.map(item =>
            API.delete(`/wishlistProduct/${item.id}`),

        )
        res.data.map(item =>
            API.delete(`/cart/${item.id}`),

        )
        Searchnavigate("/")
    }
    return (
        <>
            <div className='sticky-top'  data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">

                <nav className="navbar navbar-expand  px-0 px-sm-4  bg-white shadow-lg"  >
                    <div className="container-fluid d-flex justify-content-between">
                        <ul className="navbar-nav d-lg-flex flex-row gap-3 d-none d-lg-block">

                            <li className="nav-item">
                                <Link to="/" className="nav-link fw-bold text-dark"  data-aos="fade-right"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="2000" >MEN</Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/THE-SOULED-STORE' className="nav-link fw-bold text-dark" data-aos="fade-up"
     data-aos-duration="3000">
                                    WOMEN</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Sneakers" className="nav-link fw-bold text-dark" data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="2000"  >SNEAKERS</Link>
                            </li>
                            {/* <li className="nav-item">
                            <Link to="/filter" className="nav-link fw-bold text-dark" >FILTER</Link>
                        </li> */}
                        </ul>
                        {/* <div className=' d-lg-none nav-item'>
                        <Link to="/filter" className='nav-link fw-bold text-dark' >FILTER</Link>
                    </div> */}
                        <div >
                            <Link to='/' >
                                <img src="https://prod-img.thesouledstore.com/static/non-member-logo2.gif?w=100&dpr=2" alt="" width={"80px"}  data-aos="zoom-out-up"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2500" />
                            </Link>
                        </div>
                        <div className='d-flex align-items-center gap-3 gap-lg-3' >
                            <div className='d-lg-flex form-control  rounded-pill d-none  d-lg-block '  >


                                <input className="border-0 d-none d-lg-block" type="search" placeholder="Search" aria-label="Search"
                                    ref={inputRef} onKeyDown={handleKeyPress}
                                />

                                <a className='nav-link'><i className="bi bi-search"></i></a>
                            </div>
                            <button
                                className="btn nav-link d-lg-none"
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                            >
                                <i className="bi bi-search fs-5"></i>
                            </button>


                            {radioselect === "admin" &&

                                <Link to='/Adminpanel' className='nav-link d-none d-lg-block'>
                                    <span className=' fw-bold'>Admin</span>
                                </Link>
                            }

                            {/* <div onClick={handleprofillogin} className='nav-link' style={{ cursor: "pointer" }}>
                                <i className="bi bi-person-square fs-5"></i>
                            </div> */}
                            <div className="dropdown">
                                <div
                                    className="nav-link position-relative"
                                    style={{ cursor: "pointer" }}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-square fs-5"></i>
                                </div>

                                <ul className="dropdown-menu dropdown-menu-end shadow  w-auto custom-dropdown">
                                    {radioselect ? (
                                        <>
                                            <li className="dropdown-item-text fw-semibold">
                                                {fname || "User"}
                                            </li>
                                            <hr className="dropdown-divider" />
                                            <li
                                                className="dropdown-item fw-semibold"
                                                onClick={() => Searchnavigate("/Daskbord")}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Orders
                                            </li>
                                            <hr className="dropdown-divider" />
                                            <li
                                                className="dropdown-item fw-semibold"
                                                onClick={() =>
                                                    Searchnavigate("/Daskbord", { state: { tab: "profile" } })
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                Profile
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={Logout}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => Searchnavigate("/Login")}
                                            >
                                                Login
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>


                            <Link to="/Wishlist" className="nav-link position-relative">
                                <i className="bi bi-heart fs-5"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ display: likedata.length > 0 ? "inline-block" : "none" }}
                                >
                                    {likedata.length}
                                </span>
                            </Link>
                            <Link to='/Cart' className='nav-link  position-relative'>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ display: cart.length > 0 ? "inline-block" : "none" }}
                                >
                                {cart.length}
                            </span>
                                <i className="bi bi-cart3 fs-5"></i>
                            </Link>
                        </div>
                    </div>
                </nav>
                {showMobileSearch && (
                    <div className="bg-white shadow-sm px-3 py-2  w-100" style={{ zIndex: 1040 }}>
                        <input
                            type="search"
                            className="form-control rounded-pill"
                            placeholder="Search products..."
                            ref={inputRef}
                            onKeyDown={handleKeyPress}
                            autoFocus
                        />
                    </div>
                )}
                <div className="container-fluid d-lg-none  bg-white p-3" >
                    <ul className="row text-center p-0 m-0 list-unstyled">
                        <li className="col">
                            <Link to="/" className="nav-link fw-bold text-dark">MEN</Link>
                        </li>
                        <li className="col">
                            <Link to="/
THE-SOULED-STORE" className="nav-link fw-bold text-dark">WOMEN</Link>
                        </li>
                        <li className="col">
                            <Link to="/Sneakers" className="nav-link fw-bold text-dark" >SNEAKERS</Link>
                        </li>
                        {
                            radioselect === "admin" &&
                            <li className="col d-block d-lg-none  mt-sm-0">
                                <Link to="/Adminpanel" className="nav-link fw-bold text-danger">
                                    ADMIN
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <style>
                {
                    `
                   .custom-dropdown {
    min-width: 180px;
}

/* Mobile screen mate */
@media (max-width: 576px) {
    .custom-dropdown {
        min-width: 130px;
        font-size: 14px;
    }

    .custom-dropdown .dropdown-item,
    .custom-dropdown .dropdown-item-text {
        padding: 6px 12px;
    }
}
input:focus,
textarea:focus,
select:focus,
button:focus {
  outline: none;
}

                        `
                }
            </style>

        </>
    )
}
