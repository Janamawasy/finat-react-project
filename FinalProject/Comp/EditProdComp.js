import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';



const EditProdComp = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    const customers = useSelector((state) => state.customers);
    const purchased = useSelector((state) => state.purchased);

    const { id } = useParams()
    console.log('products111',products)
    const productobj = products.find(obj => obj.id === id);
    console.log('productobj',productobj)

    const [Name,setname] = useState(productobj.Name)
    const [Price,setprice] = useState(productobj.Price)
    const [Quantity,setquantity] = useState(productobj.Quantity)

    const handleUpdate = () => {
        dispatch({ type: 'UPDATE_PRODUCT', payload: {id, Name , Price , Quantity } })
      };

      const handleDelete = () => {
        dispatch({ type: 'DELETE_PRODUCT', payload: {id} })
      };

      const purchased_prod = purchased.filter((purch)=>purch.ProductId===id) //purchased items for customer
      console.log('purchased_prod',purchased_prod)
      const purchased_cust = purchased_prod.map((item) => customers.find((prod) => prod.id === item.CustomerId))
      console.log('purchased_cust',purchased_cust)

  return (
    <div>
        <br/><br/><br/>

        Region 1: <br/>
        Name: <input defaultValue={productobj.Name} onChange={(e)=>setname(e.target.value)}/><br/> 
        Price: <input defaultValue={productobj.Price} onChange={(e)=>setprice(e.target.value)}/><br/>
        Quantity: <input defaultValue={productobj.Quantity} onChange={(e)=>setquantity(e.target.value)}/><br/>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleUpdate}>Update</button>
        <br/><br/><br/>

        {purchased_cust &&
        <div>
          Region 2:<br/>
          {purchased_cust?.map((item,index)=>
          <Link key={index} to={`/EditCustomer/${item.id}`}>
            <li>
            {item.FirstName} {item.LastName}
            </li>
          </Link>
          
          )}
        </div>
    }

    </div>
  )
}

export default EditProdComp

