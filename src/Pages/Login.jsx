import React, { useEffect, useState } from 'react'
import API from './../Services/Api'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    const [logindata, setlogindata] = useState({
        email: '',
        password: '',
        radioselect: ''
    })

    const [showdata, setshowdata] = useState({})
    const [error, seterror] = useState('')
    const [errorradioselect, seterrorradioselect] = useState('')


    const handleinput = (e) => {
        const { name, value } = e.target
        setlogindata(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const fetchlogindata = async () => {
        const res = await API.get('/Login')
        setshowdata(res.data || {})
    }

    useEffect(() => {
        fetchlogindata()
        window.scrollTo(0, 0);
    }, [])


    const handlesubmit = async (e) => {
        e.preventDefault()

        seterror('')
        seterrorradioselect('')


        if (!logindata.email || !logindata.password) {
            seterror('Email and password required')
            return
        }

        if (!logindata.radioselect) {
            seterrorradioselect('Please select Admin or Customer')
            return
        }

        const registerdata = await API.get('/Register')
        const users = registerdata.data


        const user = users.find(
            u =>
                u.Emailid === logindata.email &&
                u.confpassword === logindata.password
        )


        if (!user) {
            seterror('Invalid email or password')
            return
        }

        if (user.radioselect !== logindata.radioselect) {
            seterrorradioselect('Role does not match with this account')
            return
        }


        const newdata = {
            email: user.Emailid,
            fname: user.fname,
            lname: user.lname,
            radioselect: user.radioselect,
            radiogender: user.radiogender
        }

        await API.put('/Login', newdata)
        setshowdata(newdata)

        navigate('/')
    }


    const Logout = async () => {
        await API.put('/Login', {})
        setshowdata({})
    }

    return (
        <div >


            {!showdata?.email && (
                <div className="container-fluid bg-light d-flex justify-content-center align-items-center vh-100">
                    <div className="card p-4 shadow" style={{ width: '420px' }}>

                        <p className='text-center'>Login with The Souled Store</p>
                        <div className="text-center mb-3 ">
                            <div className="row g-2 justify-content-center">
                                <div className="col-6 col-sm-5">
                                    <button className="btn border py-2 w-100 rounded-0 text-white" style={{ backgroundColor: "#117a7a" }}>LOGIN</button>
                                </div>
                                <div className="col-6 col-sm-5">

                                    <button className="btn border py-2 w-100 rounded-0" onClick={() => navigate('/Register')}>REGISTER</button>
                                </div>
                            </div>
                        </div>
                        <div className="border p-4" style={{ backgroundColor: '#f1f1f2' }}>
                            <form onSubmit={handlesubmit}>

                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Email Id"
                                    name="email"
                                    value={logindata.email}
                                    onChange={handleinput}
                                />

                                <input
                                    type="password"
                                    className="form-control mb-2"
                                    placeholder="Password"
                                    name="password"
                                    value={logindata.password}
                                    onChange={handleinput}
                                />

                                <small className="text-danger">{error}</small>


                                <div className="mt-3">
                                    <label className="me-2 d-block  text-sm-start">Select:</label>
                                    <div className="row g-2 ">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="radioselect"
                                                    value="admin"
                                                    checked={logindata.radioselect === 'admin'}
                                                    onChange={handleinput}
                                                />
                                                <label className="form-check-label">Admin</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="radioselect"
                                                    value="Customer"
                                                    checked={logindata.radioselect === 'Customer'}
                                                    onChange={handleinput}
                                                />
                                                <label className="form-check-label">Customer</label>
                                            </div>
                                        </div>
                                    </div>

                                    <small className="text-danger d-block">
                                        {errorradioselect}
                                    </small>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 mt-3 fw-bold"
                                >
                                    LOGIN
                                </button>

                                <p className="text-center mt-3">
                                    New User ?
                                    <span
                                        className="text-danger ms-1"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate('/Register')}
                                    >
                                        Create Account
                                    </span>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
