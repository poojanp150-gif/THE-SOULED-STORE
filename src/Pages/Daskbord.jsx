import React, { useEffect, useState } from 'react'
import API from './../Services/Api'
import { Link, useNavigate,useLocation  } from 'react-router-dom'
export default function Daskbord() {
    const [showdata, setshowdata] = useState({})
    const [activein, setactivein] = useState("orders")
    const location = useLocation();

    useEffect(() => {
    if (location.state?.tab) {
        setactivein(location.state.tab);
    } else {
        setactivein("orders"); 
    }
}, [location.state]);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        gender: "",
        birth: "",
        mobile: "",
        address: "",
        email: ""
    });
    const [showAlert, setShowAlert] = useState(false);
    const [orderdatas, setorderdatas] = useState([])
    useEffect(() => {
        fetchlogindata()
        orderdata()
    }, [])

    const fetchlogindata = async () => {
        const res = await API.get("/Login");
        const data = res.data || {};

        setFormData({
            fname: data.fname || "",
            lname: data.lname || "",
            gender: data.radiogender || "",
            birth: data.birth || "",
            mobile: data.mobile || "",
            address: data.address || "",
            email: data.email || ""
        });
    };

    const orderdata = async () => {
        const res = await API.get("/order");
        const productData = await API.get("/products");

        const orders = res.data;

        const finaldata = orders.map((order) => (
            productData.data.men.find(p => p.id === Number(order.productId)) ||
            productData.data.women.find(p => p.id === Number(order.productId)) ||
            productData.data.SNEAKERS.find(p => p.id === Number(order.productId))
        ));

        setorderdatas(finaldata);
    };

    
    const navigasion = useNavigate()
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
        navigasion("/")
    }


    const handleinput = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleclick = async () => {
        await API.put("/Login", formData);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };
    return (
        <div>
            <div className='container'>
                <div
                    className="p-2 border rounded-2 d-flex gap-2 justify-content-center align-items-center mb-3"
                    style={{ backgroundColor: "#fcf8e3", color: "#d8a75c" }}
                    role="alert"
                >
                    <i className="bi bi-clipboard-x fs-4" aria-hidden="true"></i>
                    <p className="mb-0">
                        Hey! Please note that The Souled Store team will never ask you to disclose any
                        financial information or for payment regarding any contest. For COD orders we
                        do not collect money before the order delivery. Do not share any such sensitive
                        details. Stay secure and stay safe.
                    </p>
                </div>

                <div className='row'>
                    <div className='col-md-3 '>
                        <div className="card mb-3 rounded-0 border-0" style={{ backgroundColor: "#f1f1f1" }}>
                            <div className="card-body">
                                <h6 className="mb-1 fw-bold">{formData.lname} {formData.fname} </h6>
                                <p className="text-muted mb-1 small" >{formData.email}</p>
                                <a href="#" className="text-danger small">
                                    Get Membership Now
                                </a>
                            </div>
                        </div>
                        <div className="list-group account-menu rounded-0" >
                            <a
                                className={`list-group-item ${activein === "orders" ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setactivein("orders")}
                            >
                                Orders
                            </a>
                            <a className="list-group-item disabled" >Gift Vouchers</a>
                            <a className="list-group-item disabled">
                                TSS Points <span className="text-muted small ">(Active TSS Points: 0.00)</span>
                            </a>
                            <a className="list-group-item disabled">
                                TSS Money <span className="text-muted small">(₹ 0.00)</span>
                            </a>
                            <Link to={"/FAQ"} style={{ cursor: "pointer" }} className="list-group-item">FAQs</Link>

                            <a
                                className={`list-group-item ${activein === "profile" ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setactivein("profile")}
                            >
                                Profile
                            </a></div>
                        <button className="btn btn-outline-danger w-100 mt-4" onClick={Logout}>
                            DELETE MY ACCOUNT
                        </button>
                    </div>
                    <div className="col-md-9">


                        {
                            activein === "profile" &&
                            <div>

                                <h5 className='text-body-secondary'>Edit Profile</h5>
                                <div className="card rounded-0">
                                    <div className="card-body p-0">
                                        <div className='m-3 p-3'>

                                            <p className='text-body-secondary'>Email Id</p>
                                            <p className="bg-body-secondary small border p-2 rounded-1 w-25" style={{ minWidth: "250px" }} >
                                                {formData.email}
                                            </p>
                                        </div>
                                        <hr />
                                            {showAlert && (
                    <div className="alert alert-success alert-dismissible fade show mt-3 me-3 ms-2">
                        <strong>Success!</strong> Profile updated successfully 🎉
                    </div>
                )}
                
                                        <div className=' m-4 '>
                                            <p className='text-body-secondary'>General Information</p>
                                            <hr />


                                            <div className="row">

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            First Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name='lname'
                                                            value={formData.lname}
                                                            onChange={handleinput}
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name='fname'
                                                            value={formData.fname}
                                                            onChange={handleinput}
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Gender</label>
                                                        <div className="d-flex gap-4" >
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="male"
                                                                    checked={formData.gender === "male"}
                                                                    onChange={handleinput}
                                                                />
                                                                <label className="form-check-label">Male</label>
                                                            </div>

                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="female"
                                                                    checked={formData.gender === "female"}
                                                                    onChange={handleinput}
                                                                />
                                                                <label className="form-check-label">Female</label>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Date of Birth</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="Please enter your birthdate"
                                                            name='birth'
                                                            value={formData.birth}
                                                            onChange={handleinput}
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            Mobile Number <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            placeholder="Mobile Number"
                                                            name='mobile'
                                                            value={formData.mobile}
                                                            onChange={handleinput}
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="d-flex justify-content-between">
                                                            <label className="form-label">Default Address</label>
                                                            
                                                        </div>
                                                        <textarea
                                                            className="form-control"
                                                            rows="4"
                                                            name='address'
                                                            value={formData.address}
                                                            onChange={handleinput}

                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="text-center mt-3">
                                                <button className="btn btn-success rounded-1 px-5 py-1 fw-bold " style={{ backgroundColor: "#117a7a" }} onClick={handleclick}>SAVE</button>
                                            </div>




                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            activein === "orders" &&
                            <div>
                                <p style={{ color: "#aba9ac" }} className='fw-bold'>MY ORDERS</p>

                               
                                {orderdatas.length > 0 ? (
                                    orderdatas.map((pro, id) => (
                                        <div
                                            key={id}
                                            className="card mb-3 border-0 shadow-sm"
                                        >
                                            <div className="card-body d-flex align-items-center gap-3">

                                                
                                                <img
                                                    src={pro.image}
                                                    alt={pro.title}
                                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                    className="rounded"
                                                />

                                                
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 fw-bold">{pro.title}</h6>
                                                    <p className="mb-1 text-muted small">
                                                        {pro.category} • {pro.sub_category}
                                                    </p>
                                                    <p className="mb-0 fw-semibold">₹ {pro.price}</p>
                                                </div>

                                                
                                                <span className="badge bg-success">
                                                    Delivered
                                                </span>

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted mt-4">
                                        <h5>No Orders Found</h5>
                                    </div>
                                )}

                            </div>
                        }


                    </div>


                </div>
            </div>

            <style>
                {
                    `
                    .account-menu .list-group-item:hover {
  background-color: #f8f9fa;
}
                    .account-menu .list-group-item.active{
  background-color: #dc3545;
  color: #fff;
  font-weight: 600;
}
                    `
                }
            </style>
        </div>
    )
}
