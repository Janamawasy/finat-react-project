
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';


const ProductsComp = () => {

        const products = useSelector((state) => state.products);
        const customers = useSelector((state) => state.customers);
        const purchased = useSelector((state) => state.purchased);
        const dispatch = useDispatch();

        const [newRegion,setnewRegion] = useState(false)
        const [ProdId,setProdId] = useState('')
        const [CustId,setCustId] = useState('')
        const [displayOOS,setdisplayOOS] = useState(false)

        // const a = purchased.map((purch)=>{
        //   const aa = products.find((prod)=> purch.ProductId === prod.id)
        //   return aa})

        const PurchasedProducts = () => {
          const purchaseAmount = products.map(prod => {
            const productPurchased = purchased.filter(purch => purch.ProductId === prod.id);
            return { ProdName: prod.Name, Amount: productPurchased.length };
          });
          console.log('purchaseAmount',purchaseAmount)
          return purchaseAmount;
        };

        

        const handleSaveButton = () => {
          const myprod = products.find((prod) => prod.id===ProdId)
          if (myprod.Quantity===0){
            setdisplayOOS(true)
          }else{
            dispatch({ type: 'ADD_PURCHASED', payload: { CustomerId: CustId, ProductId: ProdId } })
          }
        }

          const handleAdd = (e) => {
            setnewRegion(true)
            setCustId(e)
          }

        const getProduct = (productId) => {
          console.log('products',products.find((product) => product.id === productId))
          return products.find((product) => product.id === productId);
        };
      
        const getCustomer = (customerId) => {
          console.log('customer',customers.find((customer) => customer.id === customerId))
          return customers.find((customer) => customer.id === customerId);
        };
      
        const customerRegion = (e) => { //e = product id
          const items = purchased.filter((purchase) => purchase.ProductId === e); //selectedproduct
          // const items = purchased.filter((purchase) => purchase.ProductId.includes(e));
          console.log('purchased',items)
          const purchased_items = items.map((item) => { // to get customer id 
            const customer = customers.find((customer) => customer.id === item.CustomerId);
            console.log('customerzzz',customer)
              return {
                id: customer?.id,
                date: item.Date,
                firstName: customer?.FirstName,
                lastName: customer?.LastName
              }
            });
            console.log('common',purchased_items)

            return (
            <div >
                <table align='center'>
                  {purchased_items.map((item,index) => {
                    if (item && item.id && item.firstName) {
                      return (
                        <div key={index} style={{border:'2px solid pink'}}>
                          <li>
                            <Link to={`/EditCustomer/${item.id}`}>
                              {item.firstName} {item.lastName}
                            </Link>
                          </li>
                          <li>
                            {item.date && item.date.toLocaleDateString()}
                          </li>
                          <button onClick={() => handleAdd(item.id)}>ADD</button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </table>
              </div>
            );
          };
        
      
         

    
  return (
    <div>ProductsComp<br/>
    Region 1:
    <div>
      <h2>Purchased Products</h2>
      
        {PurchasedProducts().map((prod,index) => (
          <li key={index}>
            {prod.ProdName}: {prod.Amount || 0} purchased
          </li>
        ))}
      
    </div>
    <br/><br/>
    Region 2:
      {products.map((prod,index)=><div key={index} style={{border: '1px solid blue'}}>
        {console.log(prod)}
      <Link to={`/EditProduct/${prod.id}`}>
      Name: {prod.Name} </Link><br/>        
      Price: {prod.Price}<br/>
      Quantity: {prod.Quantity}
      {customerRegion(prod.id)}
      </div>)}

      {newRegion && 
      <div>
        <select onChange={(e)=>setProdId(e.target.value)}>
        <option value="">-- Select Product --</option>
        {products.map((prod,index)=>
          <option key={index} value={prod.id}>{prod.Name}</option>
        )} 
        </select>
        <button onClick={handleSaveButton}>Save</button>
        {displayOOS && <div>Selected Product Out of stock</div>}
        </div>}
    </div>
  )
}

export default ProductsComp



