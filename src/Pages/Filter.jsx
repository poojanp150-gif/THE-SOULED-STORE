import React, { useEffect, useState } from 'react'
import API from '../Services/Api'
import { useNavigate, useParams } from 'react-router-dom'

export default function Filter() {

    const [allProducts, setAllProducts] = useState([])
    const [displayProduct, setDisplayProduct] = useState([])
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const { value } = useParams()
    const [maxPrice, setMaxPrice] = useState(2099)
    const [sortOrder, setSortOrder] = useState('default')


    useEffect(() => {
        fetchProducts()
          window.scrollTo(0, 0); 
    }, [value])

    const fetchProducts = async () => {
        const res = await API.get('/products')

        const allProducts = [
            ...res.data.men,
            ...res.data.women,
            ...res.data.SNEAKERS
        ]

        setAllProducts(allProducts)

        if (value) {
            const filtered = allProducts.filter(p =>
                p.category.toLowerCase().includes(value.toLowerCase())
            )
            setDisplayProduct(filtered)
        } else {
            setDisplayProduct(allProducts)
        }
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);
        setCategory('');
        setSortOrder('default');
        setMaxPrice(2099)

        const filteredByType = allProducts.filter(p => p.type === selectedType);
        setDisplayProduct(filteredByType);
    }



    const handleCategoryChange = (e) => {
        const value = e.target.value
        setCategory(value)

        const filterKey = type === "SNEAKERS" ? "sub_category" : "category"

        setDisplayProduct(
            allProducts.filter(
                p =>
                    p.type === type &&
                    (value === "All" || p[filterKey] === value)
            )
        )
    }
    const handleSortChange = ((e) => {
        const value = e.target.value
        setSortOrder(value)
        let sortedProducts = [...displayProduct]

        if (value === "low") {
            sortedProducts.sort((a, b) => a.price - b.price)
        } else if (value === "high") {
            sortedProducts.sort((a, b) => b.price - a.price)
        } else {
            sortedProducts = [...displayProduct]
        }

        setDisplayProduct(sortedProducts)
    })
    const Cloathid = useNavigate()
    const singlepage = ((id) => {
        Cloathid(`/Singleproud/${id}`)

    })

    const applyFilters = (typeValue, categoryValue, priceValue) => {
        const filterKey = typeValue === "SNEAKERS" ? "sub_category" : "category";

        const filtered = allProducts.filter(p => {
            return (
                p.type === typeValue &&
                (categoryValue === "" || categoryValue === "All" || p[filterKey] === categoryValue) &&
                p.price <= priceValue
            );
        });

        setDisplayProduct(filtered);
    };

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-md-3 mb-4' >
                    <div className="card p-3 shadow-sm">
                        <h5 className="mb-3">Filter by Type</h5>
                        <div className="d-flex flex-column gap-2">
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="radio"
                                value="men"
                                name="type"
                                checked={type === 'men'}
                                onChange={handleTypeChange}
                            />
                            <label className="ms-1 me-3">Men</label>

                            <input
                                type="radio"
                                value="women"
                                name="type"
                                checked={type === 'women'}
                                onChange={handleTypeChange}
                            />
                            <label className="ms-1 me-3">Women</label>

                            <input
                                type="radio"
                                value="SNEAKERS"
                                name="type"
                                checked={type === 'SNEAKERS'}
                                onChange={handleTypeChange}
                            />
                            <label className="ms-1">Sneakers</label>
                        </div>


                        {type === 'men' && (
                            <select
                                className="form-select w-auto mb-3"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="All">Select Category</option>
                                <option value="Shirt">Shirt</option>
                                <option value="Polos">Polos</option>
                                <option value="Hoodies">Hoodies</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Oversized T-Shirts">Oversized T-Shirts</option>
                                <option value="Men Pants">Men Pants</option>
                                <option value="Men Jeans">Men Jeans</option>
                            </select>
                        )}


                        {type === 'women' && (
                            <select
                                className="form-select w-auto mb-3"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="All">Select Category</option>
                                <option value="Women Knitted Sweaters">Women Knitted Sweaters</option>
                                <option value="Women Hoodies">Women Hoodies</option>
                                <option value="Women T-Shirts">Women T-Shirts</option>
                                <option value="Women Shirts">Women Shirts</option>
                                <option value="Women Jeans">Women Jeans</option>
                                <option value="Women Pants">Women Pants</option>
                                <option value="Women Cropped Tops">Women Cropped Tops</option>
                                <option value="Women Sweatshirts">Women Sweatshirts</option>
                                <option value="Women Low Top Sneakers">Women Low Top Sneakers</option>
                            </select>
                        )}

                        {type === 'SNEAKERS' && (
                            <select
                                className="form-select w-auto mb-3"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="All">Select Category</option>
                                <option value="Men Low Top Sneakers">Men Low Top Sneakers</option>
                                <option value="Men High Top Sneakers">Men High Top Sneakers</option>
                            </select>
                        )}

                        <span className="small">Max: ₹{maxPrice}</span>




                        <input type="range" min="100" max="2099" value={maxPrice} className="form-range" onChange={(e) => { const value = Number(e.target.value); setMaxPrice(value); applyFilters(type, category, value); }} />


                        <div className="mt-3">
                            <label className="form-label">Sort by Price</label>
                            <select className="form-select" value={sortOrder} onChange={handleSortChange}>
                                <option value="default">Default</option>
                                <option value="low">Low to High</option>
                                <option value="high">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='col-md-9'>

                    <div className="row g-3">
                        {displayProduct.map((pro) => (
                            <div key={pro.id} className="col-6 col-sm-6 col-md-3" onClick={() => singlepage(pro.id)}>
                                <img src={pro.image} alt="" className="img-fluid" />

                                <p className="mb-0 small fw-bold" style={{
                                    color: '#585c70', whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>{pro.title}</p>
                                <p className="small text-muted mb-0" >{pro.category}</p>
                                <p className="fw-bold">₹{pro.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
