
import React from 'react'
import { Link } from 'react-router-dom'
import { Routes , Route } from 'react-router-dom'
import ProductsComp from './Comp/ProductsComp'
import CustomersComp from './Comp/CustomersComp'
import PurchasesComp from './Comp/PurchasesComp'
import EditProdComp from './Comp/EditProdComp'
import EditCustPage from './Comp/EditCustPage'

const MainPage1 = () => {
  return (
    <div>MainPage1
      <br/>
      <Link to='/Products'>Products</Link> <br/>
      <Link to='/Customers'>Customers</Link> <br/>
      <Link to='/Purchases'>Purchases</Link> <br/>


      <Routes>
      <Route path='/Products' element={<ProductsComp />} />
      <Route path='/EditProduct/:id' element={<EditProdComp />} />
      <Route path='/Customers' element={<CustomersComp />}/>
      <Route path='/EditCustomer/:id' element={<EditCustPage />} />
      <Route path='/Purchases' element={<PurchasesComp />}/>
      </Routes>

     
    </div>
  )
}

export default MainPage1

