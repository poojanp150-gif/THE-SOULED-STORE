import React, { useEffect, useState } from 'react'
import API from "./../Services/Api"
import { useNavigate } from "react-router-dom";

export default function Address() {
    const [totalamount, settotalamount] = useState({
        cartTotal: 0,
        gst: 0,
        totalAmount: 0
    })
    const [address, setaddress] = useState({
        flat: "",
        street: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
        name: "",
        phone: ""
    })

    const [error, seterror] = useState({
        errorflat: "",
        errorstreet: "",
        errorlandmark: "",
        errorpincode: "",
        errorcity: "",
        errorstate: "",
        errorname: "",
        errorphone: ""
    })

    let isValid = true

    
    useEffect(() => {
        totaldata()
    }, [])
    const orderNavigate = useNavigate()
    const totaldata = (async () => {
        const res = await API.get('/Paymentdata')
        const datas = res.data
        settotalamount(datas)
    })
    const handleinput = (e) => {
        const { name, value } = e.target
        setaddress(prev => ({ ...prev, [name]: value }))
    }
   const handleSubmit = () => {
    let newError = {
        errorflat: "",
        errorstreet: "",
        errorlandmark: "",
        errorpincode: "",
        errorcity: "",
        errorstate: "",
        errorname: "",
        errorphone: ""
    }

    let isValid = true

    if (!address.flat.trim()) {
        newError.errorflat = "Flat / Building is required"
        isValid = false
    }

    if (!address.street.trim()) {
        newError.errorstreet = "Street is required"
        isValid = false
    }

    if (!address.landmark.trim()) {
        newError.errorlandmark = "Landmark is required"
        isValid = false
    }

    if (!address.pincode || address.pincode.length !== 6) {
        newError.errorpincode = "Valid 6 digit pincode required"
        isValid = false
    }

    if (!address.city.trim()) {
        newError.errorcity = "City is required"
        isValid = false
    }

    if (!address.state.trim()) {
        newError.errorstate = "State is required"
        isValid = false
    }

    if (!address.name.trim()) {
        newError.errorname = "Name is required"
        isValid = false
    }

    if (!address.phone || address.phone.length !== 10) {
        newError.errorphone = "Valid 10 digit phone number required"
        isValid = false
    }

    seterror(newError)

    if (isValid) {
        orderNavigate('/Payment')
    }
}

    return (
        <div>
            <div className="container my-4 mb-5 ">

                <h5 className="text-center fw-bold mb-4 small">
                    <span style={{ color: "#117a7a" }}>MY BAG - - - - - - - - - - - - - ADDRESS </span> - - - - - - - - - - - - - PAYMENT
                </h5>
                <hr />
                <p>Delivery To</p>
                <div className="row g-4 justify-content-center">

                    <div className="col-12 col-lg-8 ">

                        <div className="card mb-3 shadow-sm rounded-0 shadow-sm">


                            <div className="card-body  ">
                                <form >
                                    <div className='mb-3'>
                                        <input type="text" placeholder='Flat No/Building/Company*' name="flat" value={address.flat} onChange={handleinput} className='rounded-1 form-control' />
                                        <small className="text-danger">{error.errorflat}</small>
                                    </div>
                                    <div className='mb-3'>
                                        <input type="text" placeholder='Stret Name,Area*' name='street' value={address.street} onChange={handleinput} className='rounded-1 form-control' />
                                        <small className="text-danger">{error.errorstreet}</small>
                                    </div>
                                    <div className='mb-3'>
                                        <input type="text" placeholder='Landmark*' className='rounded-1 form-control' name='landmark' value={address.landmark} onChange={handleinput} />
                                        <small className="text-danger">{error.errorlandmark}</small>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-6 ' >
                                            <input type="number" placeholder='PinCode`*' className='rounded-1 form-control' name='pincode' value={address.pincode} onChange={handleinput} />
                                            <small className="text-danger">{error.errorpincode}</small>
                                        </div>
                                        <div className='col-6  ' >
                                            <input type="text" placeholder='City*' className='rounded-1 form-control' name='city' value={address.city} onChange={handleinput} />
                                            <small className="text-danger">{error.errorcity}</small>
                                        </div>
                                    </div>
                                    <div className='row  mb-3'>
                                        <div className='col-6 ' >
                                            <input type="text" value={"India"} className='rounded-1 form-control' disabled />
                                        </div>
                                        <div className='col-6  ' >
                                            <input type="text" placeholder='State*' className='rounded-1 form-control' name='state' value={address.state} onChange={handleinput} />
                                        <small className="text-danger">{error.errorstate}</small>
                                        </div>
                                    </div>
                                    <h5>Contact Details</h5>

                                    <div className='p-2 bg-dark-subtle rounded-1 mb-2'>
                                        <input type="text" placeholder='Name' className='rounded-1 border p-2 form-control mb-2' name='name' value={address.name} onChange={handleinput} />
                                                <small className="text-danger">{error.errorname}</small>
                                        <div className='   form-control ' >
                                            <p className='text-center m-0 border p-1 rounded-1 d-flex align-items-center  form-control'>+91
                                                <input type="number" placeholder='Phone Number' className=' border-0 form-control' name='phone' value={address.phone} onChange={handleinput} /></p>
                                                <small className="text-danger">{error.errorphone}</small>
                                        </div>
                                    </div>
                                    <h5>Save Addres As</h5>
                                    <div className='d-flex gap-2 mb-3'>
                                        <button className='btn btn-sm border-2 border-dark-subtle'>Home</button>
                                        <button className='btn btn-sm border-2 border-dark-subtle'>Work</button>
                                        <button className='btn btn-sm border-2 border-dark-subtle'>Other</button>
                                        
                                    </div>
                                    <div className=''>
                                        <input type="checkbox" className='me-2' />
                                        <span>Save This As Default Address</span>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



                    <div className="col-12 col-lg-4">
                        <div className='card shadow-sm  rounded-0 p-2 mb-2'>
                            <button className="btn btn-success w-100  rounded-1" type='submit' style={{ backgroundColor: "#117a7a" }}
                                onClick={() => orderNavigate('/Cart')}
                            >
                                Back to MY  BAG
                            </button>
                        </div>
                        <div className="card shadow-sm  rounded-0" >
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">PRICE DETAILS</h6>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Cart Total</span>
                                    <span>₹ {totalamount.cartTotal}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span>GST (18%)</span>
                                    <span>₹ {totalamount.gst.toFixed(2)}</span>
                                </div>
                                <hr />

                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total Amount</span>
                                    <span>₹ {totalamount.totalAmount}</span>
                                </div>
                                <button className="btn btn-success w-100 mt-3 rounded-1" type='submit' style={{ backgroundColor: "#117a7a" }}
                                    onClick={handleSubmit}
                                >
                                    CONTINUE TO PATMENT
                                </button>
                            </div>
                           
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
