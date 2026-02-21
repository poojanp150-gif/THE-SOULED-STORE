import { Routes, Route, Navigate } from 'react-router-dom'
import './../src/Index.css'
import Searchbar from './Pages/Searchbar'
import PageNotFound from './Pages/PageNotFound'
import SingleProductPage from './Pages/SingleProductPage'
import Men from './Pages/Men'
import Women from './Pages/Women'
import Wishlist from './Pages/Wishlist'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Layout from './Pages/Layout'
import Sneakers from './Pages/Sneakers'
import Address from './Pages/Address'
import Payment from './Pages/Payment'
import Adminpanel from './Pages/Adminpanel'
import ThankyouPage from './Pages/ThankyouPage'
import Filter from './Pages/Filter'
import Daskbord from './Pages/Daskbord'
import FAQ from './Pages/FAQ'

function App() {


  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Men />} />
          <Route path='/search/:value' element={<Searchbar />} />
          <Route path='*' element={<PageNotFound />}></Route>
          <Route path='/Singleproud/:id' element={<SingleProductPage />} />
          <Route path='/women' element={<Women />} />
          <Route path='/Sneakers' element={<Sneakers/>} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Address' element={<Address/>} />
          <Route path='/Payment' element={<Payment/>} />
          <Route path='/Adminpanel' element={<Adminpanel/>} />
          <Route path='/Thankyouorder' element={<ThankyouPage/>} />
          <Route path="/filter/:value" element={<Filter/>} />
          <Route path="/Daskbord" element={<Daskbord/>} />
          <Route path="/FAQ" element={<FAQ/>} />
        </Route>
      </Routes>
    
    
        

    </>
  )
}

export default App
