import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';


const CustomersComp = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  console.log('wwww',customers)
  const products = useSelector((state) => state.products);
  const purchased = useSelector((state) => state.purchased);

  const [Region2,setRegion2] = useState(false)
  const [ProdId,setProdId] = useState('')
  const [CustId,setCustId] = useState('')
  const [displayOOS,setdisplayOOS] = useState(false)  //OOS: out of stock 


  const handleBuy = () => {
    const product = products.find(product => product.id === ProdId);
  
    if (product && product.Quantity === 0) {
      setdisplayOOS(true)
    }else{
      dispatch({ type: 'ADD_PURCHASED', payload: { CustomerId: CustId, ProductId: ProdId } });
    }
    };

  const handleBuyProduct = (e) => {
    setCustId(e)
    setRegion2(true)
  }

  const ProdNameDisplay = (e) => {
    const items= purchased.filter((purchase)=>purchase.CustomerId === e)
    const purchased_items = items.map((item) => products.find((prod) => prod.id === item.ProductId))
    return(
      <div>
        <ul>
        {purchased_items.map((item,index)=>
        <Link key={index} to={`/EditProduct/${item?.id}`}>
          <li>{item.Name}</li>
        </Link>
        )}
        </ul> 
      </div>
    )
  }

  const PurchaseDateDisplay = (e) => {
    const items= purchased.filter((purchase)=>purchase.CustomerId === e)
    console.log('aa',items)

    return(
      <div>
        <ul>
        {items.map((item,index)=>
          <li key={index}>{item.Date.toLocaleDateString()}</li>
        )}
        </ul> 
      </div>
    )
  }



  return (
    <div>CustomersComp
      <table >
      <thead>
        <tr >
          <th style={{border:'1px solid black'}}>Customer Name</th>
          <th style={{border:'1px solid black'}}>Products</th>
          <th style={{border:'1px solid black'}}>Purchase Date</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((cust,index)=>
        <tr key={index}>
          <th>{cust.FirstName} {cust.LastName}</th>
          <th> {true && ProdNameDisplay(cust.id)} </th>
          <th>
                {true && PurchaseDateDisplay(cust.id)}
          </th>
          <button onClick={() => handleBuyProduct(cust.id)}>Buy Product</button>
        </tr>
        )}
        <tr></tr>
      </tbody>
      </table>



      {Region2 && <div>
        Region 2 <br/><br/>
        <select onChange={(e)=>setProdId(e.target.value)}>
        <option value="">-- Select Product --</option>
        {products.map((prod,index)=>
          <option key={index} value={prod.id}>{prod.Name}</option>
        )} 
        </select>
        <button onClick={handleBuy}>Buy</button>
        {displayOOS && <div>Selected Product Out of stock</div>}
        </div>}
    </div>
    
  )
}

export default CustomersComp