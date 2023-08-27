import {useState} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';


const EditCustPage = () => {
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customers);
  const purchased = useSelector((state) => state.purchased);
  const products = useSelector((state) => state.products);

  const { id } = useParams()
  const customerobj = customer.find(obj => obj.id === id);

  const [fName,setfname] = useState(customerobj?.FirstName)
  const [lName,setlname] = useState(customerobj?.LastName)
  const [City,setCity] = useState(customerobj?.City)

  const handleUpdate = () => {
      dispatch({ type: 'UPDATE_CUSTOMER', payload: {id, FirstName: fName , LastName: lName , City } })
    };

  const handleDelete = () => {
      dispatch({ type: 'DELETE_CUSTOMER', payload: {id} })
    };

  const purchased_cost = purchased.filter((purch)=>purch.CustomerId===id) //purchased items for customer
  const purchased_items = purchased_cost.map((item) => products.find((prod) => prod.id === item.ProductId))

return (
  <div>        
    <br/><br/><br/>
    
      Region 1: <br/>
      Fisrt Name: <input defaultValue={customerobj?.FirstName} onChange={(e)=>setfname(e.target.value)}/><br/> 
      Last Name: <input defaultValue={customerobj?.LastName} onChange={(e)=>setlname(e.target.value)}/><br/>
      City: <input defaultValue={customerobj?.City} onChange={(e)=>setCity(e.target.value)}/><br/>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>

      <br/><br/><br/>

    {purchased_items &&
    <div>
      Region 2:<br/>
      {purchased_items?.map((item,index)=>
      <Link key={index} to={`/EditProduct/${item?.id}`}>
      <li >{item?.Name}</li>
      </Link>
      
      )}
    </div>
    }
  </div>
)
}

export default EditCustPage