import React, { useEffect, useState } from 'react'
import API from './../Services/Api'
export default function Adminpanel() {
    const [data, setdata] = useState([])
    const [changedata, setchangedata] = useState({
        title: "",
        category: "",
        sub_category: "",
        price: "",
        type: "",
        image: "",
        images: []

    })
    const [editindex, seteditindex] = useState(null)
    const featchdata = (async () => {
        const res = await API.get("/products")
        const datamen = res.data.men
        const datawomen = res.data.women
        const datasnaker = res.data.SNEAKERS
        setdata([...datamen, ...datawomen, ...datasnaker])
    })
    useEffect(() => {
        featchdata()
    }, [])

    const handleChangeInput = ((e) => {
        const { name, value } = e.target
        setchangedata((prev) => ({
            ...prev, [name]: value
        }))
    })

    const handlesubmit = async (e) => {
        e.preventDefault()
        const res = await API.get("/products")
        const products = res.data
        const login = await API.get("/Login")
        if (editindex === null) {

            const newProduct = {
                id: Date.now(),
                ...changedata
            }
            products[changedata.type].push(newProduct)
        } else {
            products[changedata.type] = products[changedata.type].map(item => item.id === editindex ? { ...item, ...changedata } : item)
        }

        await API.put("/products", products)
        seteditindex(null)
        setchangedata({
            title: "",
            category: "",
            sub_category: "",
            price: "",
            type: "",
            image: ''
        })
        featchdata()
        alert("Product Added Successfully")
    }

    const Delete = async (id, type) => {
        const res = await API.get("/products")
        const products = res.data
        products[type] = products[type].filter(item => item.id !== id)
        await API.put("/products", products)
        featchdata()
    }
    const Update = async (id, type) => {
        const res = await API.get("/products")
        const products = res.data

        const productToEdit = products[type].find(item => item.id === id)

        setchangedata({
            title: productToEdit.title,
            category: productToEdit.category,
            sub_category: productToEdit.sub_category,
            price: productToEdit.price,
            type: type,
            image: productToEdit.image,
            images: productToEdit.images || []
        })

        seteditindex(id)
    }
    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setchangedata(prev => ({
                ...prev,
                image: reader.result
            }))
        }
        reader.readAsDataURL(file)
    }
    const handleSubImages = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setchangedata(prev => {
                const updatedImages = [...prev.images];
                updatedImages[index] = reader.result;
                return {
                    ...prev,
                    images: updatedImages
                };
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className='container-fluid'>

                <form onSubmit={handlesubmit} className="card p-4 shadow-sm mb-3">
                    <h5 className="mb-3 text-center">Add / Update Product</h5>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter title"
                                name="title"
                                value={changedata.title}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                name="category"
                                value={changedata.category}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Sub Category</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter sub category"
                                name="sub_category"
                                value={changedata.sub_category}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter price"
                                name="price"
                                value={changedata.price}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Product Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Product Type</label>
                            <select
                                className="form-select"
                                name="type"
                                value={changedata.type}
                                onChange={handleChangeInput}
                            >
                                <option value="">Select Type</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="SNEAKERS">Sneakers</option>
                            </select>
                        </div>
                        <div className="row">

                            <div className="row">
                                <div className="col-md-4 mb-3 mt-3">
                                    <label className="form-label">Sub Image 1</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => handleSubImages(e, 0)}
                                    />
                                </div>

                                <div className="col-md-4 mb-3 mt-3">
                                    <label className="form-label">Sub Image 2</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => handleSubImages(e, 1)}
                                    />
                                </div>

                                <div className="col-md-4 mb-3 mt-3">
                                    <label className="form-label">Sub Image 3</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => handleSubImages(e, 2)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="col-12 text-center mt-3">
                            <button type="submit" className="btn btn-primary px-5">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <div className="row g-3">
    {data.map((pro) => (
        <div
            key={pro.id}
            className="col-6 col-sm-6 col-md-4 col-lg-3"
        >
            <div className="card h-100 shadow-sm border-0 rounded-3">

                {/* IMAGE */}
                <div className="position-relative">
                    <img
                        src={pro.image}
                        alt=""
                        className="img-fluid w-100"
                        style={{ height: "220px", objectFit: "cover" }}
                    />
                </div>

                {/* BODY */}
                <div className="card-body d-flex flex-column">
                    <p className="mb-1 small fw-bold text-truncate" style={{ color: '#585c70' }}>
                        {pro.title}
                    </p>

                    <p className="mb-1 small" style={{ color: "#737577" }}>
                        {pro.category}
                    </p>

                    <p className="mb-2 small fw-bold" style={{ color: "#58595b" }}>
                        ₹{pro.price}
                    </p>

                    {/* THUMBNAILS */}
                    <div className="d-flex gap-2 flex-wrap mt-auto">
                        {pro.images && pro.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                width="45"
                                height="45"
                                className="rounded border"
                                style={{ objectFit: "cover" }}
                                alt="product"
                            />
                        ))}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                    <button
                        className="btn btn-sm btn-danger px-3"
                        onClick={() => Delete(pro.id, pro.type)}
                    >
                        Delete
                    </button>

                    <button
                        className="btn btn-sm btn-primary px-3"
                        onClick={() => Update(pro.id, pro.type)}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    ))}
</div>

            </div>
        </div>
    )
}
