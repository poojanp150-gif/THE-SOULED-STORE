import React from 'react'

export default function Footer() {
    return (
        <div className='mt-5'>
            <div>
                <div className='bg-danger p-2'>
                    <h1 className='text-center  text-white '>HOMEGROWN INDIAN BRAND</h1>
                </div>
                <div>
                    <h1 className='text-center'>Over 6 Million Happy Customers</h1>
                </div>
                <footer className="bg-light pt-5" >
                    <div className="container">
                        <div className="row gy-4">


                            <div className="col-6 col-md-3 fw-bold">
                                <h6 className="text-danger fw-bold">NEED HELP</h6>
                                <ul className="list-unstyled small" style={{ color: "#58595c" }}>
                                    <li className='mb-2'>Contact Us</li>
                                    <li className='mb-2'>Track Order</li>
                                    <li className='mb-2'>Returns & Refunds</li>
                                    <li className='mb-2'>FAQs</li>
                                    <li className='mb-2'>My Account</li>

                                </ul>
                            </div>


                            <div className="col-6 col-md-3 fw-bold">
                                <h6 className="text-danger fw-bold">COMPANY</h6>
                                <ul className="list-unstyled small" style={{ color: "#58595c" }}>
                                    <li className='mb-2'>About Us</li>
                                    <li className='mb-2'>Investor Relation</li>
                                    <li className='mb-2'>Careers</li>
                                    <li className='mb-2'>Gift Vouchers</li>
                                    <li className='mb-2'>Community Initiatives</li>
                                </ul>
                            </div>


                            <div className="col-6 col-md-3 fw-bold">
                                <h6 className="text-danger fw-bold">MORE INFO</h6>
                                <ul className="list-unstyled small" style={{ color: "#58595c" }}>
                                    <li className='mb-2'>T&C</li>
                                    <li className='mb-2'>Privacy Policy</li>
                                    <li className='mb-2'>Sitemap</li>
                                    <li className='mb-2'>Get Notified</li>
                                    <li className='mb-2'>Blogs</li>
                                </ul>
                            </div>


                            <div className="col-6 col-md-3 fw-bold">
                                <h6 className="text-danger fw-bold">STORE NEAR ME</h6>
                                <ul className="list-unstyled small" style={{ color: "#58595c" }}>
                                    <li className='mb-2'>Mumbai</li>
                                    <li className='mb-2'>Pune</li>
                                    <li className='mb-2'>Bangalore</li>
                                    <li className='mb-2'>Hubballi</li>
                                    <li className="text-primary">View More</li>
                                </ul>
                            </div>

                        </div>


                        <div className="text-center my-5">
                            <h6 className="fw-bold">EXPERIENCE THE SOULED STORE APP</h6>
                            <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" height="45" />
                                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" height="45" />
                            </div>
                        </div>


                        <div className="d-flex justify-content-end align-items-center gap-3 mb-4">
                            <p className="mb-0">Follow Us:</p>
                            <i className="bi bi-facebook fs-4"></i>
                            <i className="bi bi-instagram fs-4"></i>
                            <i className="bi bi-snapchat fs-4"></i>
                            <i className="bi bi-twitter-x fs-4"></i>
                        </div>



                        <div className="border p-3 d-flex justify-content-between align-items-center mb-4">
                            <span className="text-danger fw-bold">WHO WE ARE</span>
                            <span className="fs-4 text-danger">+</span>
                        </div>


                        <div className="row text-center align-items-center small pb-4">

                            
                            <div className="col-md-6 mb-3">
                                <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-2">
                                    <strong>100% Secure Payment:</strong>
                                    <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" alt="PhonePe" height="35" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png" alt="GPay" height="30" />
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8tmeNh6HjGtf0_lSVvUScEK2BQiyVQI-7xA&s" alt="Amazon Pay" height="35" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png" alt="Mastercard" height="30" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Paytm_logo.jpg" alt="Paytm" height="30" />
                                </div>
                            </div>

                            
                            <div className="col-md-6">
                                <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-2">
                                    <strong>Shipping Partners:</strong>
                                    <img src="https://www.clipartmax.com/png/middle/79-793995_home-dtdc-courier-logo-png.png" alt="DTDC" height="28" />
                                    <img src="https://mir-s3-cdn-cf.behance.net/projects/404/9874fd193682125.Y3JvcCwxNzg5LDE0MDAsNTA1LDA.png" alt="Delhivery" height="28" />
                                    <img src="https://images.icon-icons.com/1235/PNG/512/1492719294-ecomexpress_83637.png" alt="Ecom Express" height="28" />
                                    <img src="https://i.pinimg.com/736x/98/bd/e5/98bde5a3506ff4c628b4c004fbc9a2b4.jpg" alt="XpressBees" height="28" />
                                </div>
                            </div>

                        </div>


                    </div>
                   
                </footer>
            </div>

            <style>
                {`
                    li:hover{
                        color:red
                    }

                `}
            </style>
        </div>
    )
}
