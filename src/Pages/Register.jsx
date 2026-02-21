import React from 'react'
import { useState } from 'react'
import API from './../Services/Api'
import Navbar from './../Navbar'
import { useNavigate } from 'react-router-dom';

export default function Register() {
        const login=useNavigate()
    
    const [RegisterData, setRegisterData] = useState({
        fname: '',
        lname: '',
        Emailid: '',
        password: '',
        confpassword: '',
        birthdate: '',
        phonenumber: '',
        radiogender: '',
        radioselect:''
    })

    const [errormessage, seterrormessage] = useState({
        errorfname: '',
        errorlname: '',
        errorEmailid: '',
        errorpassword: '',
        errorconfpassword: '',
        errorphonenumber: '',
        errorradiogender: '',
        errorradioselect:''
    })

    let isValid = true;

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const Handleinput = (e) => {
        const { name, value } = e.target
        setRegisterData(prev => ({ ...prev, [name]: value }))
    }

    const FormSubmit = async (e) => {
        e.preventDefault()

        seterrormessage({
            errorfname: '',
            errorlname: '',
            errorEmailid: '',
            errorpassword: '',
            errorconfpassword: '',
            errorphonenumber: '',
            errorradiogender: '',
            errorradioselect:''
        })

        if (RegisterData.fname === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorfname: "Required." }))
        }
        if (RegisterData.lname === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorlname: "Required." }))
        }
        if (RegisterData.Emailid === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorEmailid: "Please enter valid email.." }))
        }
        if (RegisterData.password === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorpassword: "required." }))
        } else if (!passwordRegex.test(RegisterData.password)) {
            isValid = false
            seterrormessage(prev => ({
                ...prev,
                errorpassword:
                    "Password must be 8 chars, uppercase, lowercase, number & special char"
            }))
        }
        if (RegisterData.confpassword === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorconfpassword: "Confirm password required" }))
        } else if (RegisterData.password !== RegisterData.confpassword) {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorconfpassword: "Password not match" }))
        }
        if (RegisterData.phonenumber.length  !== 10) {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorphonenumber: "required." }))
        }
        if (RegisterData.radiogender === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorradiogender: "Please select gender" }))
        }if (RegisterData.radioselect === "") {
            isValid = false
            seterrormessage(prev => ({ ...prev, errorradioselect: "Please select" }))
        }

        if (!isValid) return

        const Newdata = {
            fname: RegisterData.fname,
            Emailid: RegisterData.Emailid,
            confpassword: RegisterData.confpassword,
            radiogender: RegisterData.radiogender,
            radioselect: RegisterData.radioselect,
            lname:RegisterData.lname 
        }

        await API.post('/Register', Newdata)

        setRegisterData({
            fname: '',
            lname: '',
            Emailid: '',
            password: '',
            confpassword: '',
            birthdate: '',
            phonenumber: '',
            radiogender: '',
            radioselect:''
        })
        login('/Login')
    }

    return (
        <>
            <div className="container-fluid bg-light d-flex justify-content-center align-items-center py-5 ">
                <div className="card p-4 shadow rounded-0" style={{ width: '420px' }}>
                    <p className='text-center'>Register with The Souled Store</p>
                    <div className="text-center mb-3 ">
                         <div className="row g-2 justify-content-center">
                             <div className="col-6 col-sm-5">
                        <button className="btn border py-2 w-100 rounded-0" onClick={()=>login('/Login')} >LOGIN</button></div>
                        <div className="col-6 col-sm-5">
                        <button className="btn border py-2 w-100 rounded-0 text-white" style={{backgroundColor:"#117a7a"}} >REGISTER</button>
                        </div>
                    </div>
                    </div>
                    <div className='border p-4' style={{ backgroundColor: "#f1f1f2" }}>

                        <div className=" row gap-3 mb-3">

                            
                            <button className="btn btn-outline-secondary d-flex align-items-center px-3 py-2 rounded-3 col">
                                <span className="border-end pe-2 me-2 d-flex align-items-center">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                                        alt="fb"
                                        width="20"
                                    />
                                </span>
                                <span className="fw-medium">Facebook</span>
                            </button>

                            
                            <button className="btn btn-outline-secondary d-flex align-items-center px-3 py-2 rounded-3 col">
                                <span className="border-end pe-2 me-2 d-flex align-items-center">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgqhB3HC4-MpEPQ9mOMXQ6JlQg2koqsi4ImA&s"
                                        alt="google"
                                        width="20"
                                    />
                                </span>
                                <span className="fw-medium">Google</span>
                            </button>

                        </div>


                        <p className="text-center text-muted fw-bold">— OR —</p>

                        <form onSubmit={FormSubmit}>
                            <div className="row mb-2">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fname"
                                        placeholder="First Name *"
                                        value={RegisterData.fname}
                                        onChange={Handleinput}
                                    />
                                    <small className="text-danger">{errormessage.errorfname}</small>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lname"
                                        placeholder="Last Name *"
                                        value={RegisterData.lname}
                                        onChange={Handleinput}
                                    />
                                    <small className="text-danger">{errormessage.errorlname}</small>
                                </div>
                            </div>

                            <div className="mb-2">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="Emailid"
                                    placeholder="Email ID *"
                                    value={RegisterData.Emailid}
                                    onChange={Handleinput}
                                />
                                <small className="text-danger">{errormessage.errorEmailid}</small>
                            </div>

                            <div className="mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Choose New Password *"
                                    value={RegisterData.password}
                                    onChange={Handleinput}
                                />
                                <small className="text-danger">{errormessage.errorpassword}</small>
                            </div>

                            <div className="mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confpassword"
                                    placeholder="Confirm Password *"
                                    value={RegisterData.confpassword}
                                    onChange={Handleinput}
                                />
                                <small className="text-danger">{errormessage.errorconfpassword}</small>
                            </div>

                            <div className="mb-2">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="birthdate"
                                    value={RegisterData.birthdate}
                                    onChange={Handleinput}
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phonenumber"
                                    placeholder="Mobile Number (For order status update) *"
                                    value={RegisterData.phonenumber}
                                    onChange={Handleinput}
                                />
                                <small className="text-danger">{errormessage.errorphonenumber}</small>
                            </div>

                            <div className="mb-2">
                                <label className="me-2">Gender:</label>

                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiogender"
                                        value="male"
                                        checked={RegisterData.radiogender === "male"}
                                        onChange={Handleinput}
                                    />
                                    <label className="form-check-label">Male</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radiogender"
                                        value="female"
                                        checked={RegisterData.radiogender === "female"}
                                        onChange={Handleinput}
                                    />
                                    <label className="form-check-label">Female</label>
                                </div>

                                <small className="text-danger d-block">
                                    {errormessage.errorradiogender}
                                </small>
                            </div>
                            <div className="mb-3">
                                <label className="me-2">Select:</label>

                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radioselect"
                                        value="admin"
                                        checked={RegisterData.radioselect === "admin"}
                                        onChange={Handleinput}
                                    />
                                    <label className="form-check-label">admin</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radioselect"
                                        value="Customer"
                                        checked={RegisterData.radioselect === "Customer"}
                                        onChange={Handleinput}
                                    />
                                    <label className="form-check-label">Customer</label>
                                </div>

                                <small className="text-danger d-block">
                                    {errormessage.errorradioselect}
                                </small>
                            </div>
                            <button type="submit" className="btn w-100 text-white fw-bold" style={{backgroundColor:"#117a7a"}}>
                                REGISTER
                            </button>
                            <p className='text-center mt-3'>Already a Customer?
                                  <a style={{cursor:"pointer"}} className='small text-danger'  onClick={()=>login('/Login')}>
                                Login
                                </a>
                                 </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
