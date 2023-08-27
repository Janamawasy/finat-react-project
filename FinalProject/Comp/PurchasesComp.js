import {useRef, useState} from 'react'
import { useSelector } from 'react-redux';

const PurchasesComp = () => {

  const dateInputRef = useRef(null);

  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const purchased = useSelector((state) => state.purchased);

  const [selected_Cust,setselected_Cust] = useState('')
  const [selected_Prod,setselected_Prod] = useState('')
  const [selected_Date,setselected_Date] = useState('')  
  const [tableON,settableON] = useState(false)

  const [DispDates,setDispDates] = useState([])
  const [DispProduct,setDispProduct] = useState([])
  const [DispCustomer,setDispCustomer] = useState([])

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    console.log('newDate',newDate)
    setselected_Date(newDate);
  };


  const handleSearch = () =>{
    settableON(true)

    if(selected_Cust && !selected_Prod && !selected_Date){  //if just the customer was selected
      const customer_purchases = purchased.filter((purch)=>purch.CustomerId === selected_Cust) //here i got productid + date of the customer purchases
      const product_purchases = customer_purchases.map((item) => products.find((prod) => prod.id === item.ProductId)) //here the purchased products of the customer - product name
      const DispDates1 = customer_purchases.map((purch)=>purch.Date.toLocaleDateString())
      setDispDates(DispDates1)
      setDispProduct(product_purchases.map((prod)=>prod.Name) )
      const DispCustomer1 = customers.find((cust) => cust.id === selected_Cust);
      const { FirstName, LastName } = DispCustomer1
      setDispCustomer({ FirstName, LastName })

      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)
      console.log('FirstName LastName:',DispCustomer)


    }else if(selected_Prod && !selected_Cust && !selected_Date){ //if just the product was selected
      console.log(selected_Prod)
      const product_purchases = purchased.filter((purch)=>purch.ProductId === selected_Prod) //here i got customerid + date of the product purchases
      const customer_purchases = product_purchases.map((item) => customers.find((prod) => prod.id === item.CustomerId)) //here the purchased products of the customer - product name
      console.log('customer_purchases',customer_purchases)
      
      setDispCustomer(customer_purchases.map(({ FirstName, LastName }) => ({ FirstName, LastName })))
      setDispDates(product_purchases.map((purch)=>purch.Date.toLocaleDateString()))
      setDispProduct([products.find((prod) => prod.id === selected_Prod).Name]);
      console.log('DispCustomer:',DispCustomer)
      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)

    }else if(selected_Date && !selected_Prod && !selected_Cust ){ //if just the Date was selected
      console.log('selected_Date',selected_Date)
      const product_purchases = purchased.filter((purch)=> (purch.Date).toLocaleDateString() === selected_Date) //here i got customerid + date of the product purchases
      const customer_purchases = product_purchases.map((item) => customers.find((prod) => prod.id === item.CustomerId)) //here the purchased products of the customer - product name
      console.log('customer_purchases',customer_purchases)
      
      setDispCustomer(customer_purchases.map(({ FirstName, LastName }) => ({ FirstName, LastName })))
      setDispDates([selected_Date])
      setDispProduct(products.find((prod) => prod.id === selected_Prod).Name);
      console.log('DispCustomer:',DispCustomer)
      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)

    }else if(selected_Prod && selected_Cust && !selected_Date){ //if the product + customer were selected
      const product_purchases = purchased.filter((purch)=>purch.ProductId === selected_Prod && purch.CustomerId === selected_Cust) //here i got dates 

      setDispDates(product_purchases.map((purch)=>purch.Date.toLocaleDateString()))
      setDispProduct([products.find((cust) => cust.id === selected_Prod).Name])
      setDispCustomer([customers.find((cust) => cust.id === selected_Cust)])

      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)
      console.log('DispCustomer:',DispCustomer)

    }else if(selected_Prod && !selected_Cust && selected_Date){ //if the product + date were selected
      console.log('selected_Date',selected_Date)

      const product_purchases = purchased.filter((purch)=>purch.ProductId === selected_Prod && purch.Date.toLocaleDateString() === selected_Date) //here i got dates 
      const customer_purchases = product_purchases.map((item) => customers.find((prod) => prod.id === item.CustomerId)) //here the purchased products of the customer - product name

      setDispDates([selected_Date])
      setDispProduct([products.find((cust) => cust.id === selected_Prod).Name])
      setDispCustomer(customer_purchases.map(({ FirstName, LastName }) => ({ FirstName, LastName })))

      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)
      console.log('DispCustomer:',DispCustomer)

    }else if(!selected_Prod && selected_Cust && selected_Date){ //if customer + date were selected
      const product_purchases = purchased.filter((purch)=>purch.CustomerId === selected_Cust && purch.Date.toLocaleDateString() === selected_Date) //here i got dates 
      const customer_purchases = product_purchases.map((item) => customers.find((prod) => prod.id === item.ProductId)) //here the purchased products of the customer - product name

      setDispDates([selected_Date])
      setDispProduct(product_purchases.map((prod)=>prod.Name) )
      setDispCustomer([customers.find((cust) => cust.id === selected_Cust)])

      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)
      console.log('DispCustomer:',DispCustomer)

    }else if(selected_Prod && selected_Cust && selected_Date){ //if customer + product + date were selected
      const product_purchases = purchased.filter((purch)=>purch.CustomerId === selected_Cust && purch.ProductId===selected_Prod && purch.Date.toLocaleDateString() === selected_Date) //here i got dates 
      const customer_purchases = product_purchases.map((item) => customers.find((prod) => prod.id === item.ProductId)) //here the purchased products of the customer - product name

      setDispDates(product_purchases.map((purch)=>purch.Date.toLocaleDateString()))
      setDispProduct(product_purchases.map((prod)=>prod.Name) )
      setDispCustomer([customers.find((cust) => cust.id === selected_Cust)])

      console.log('DispDates',DispDates)
      console.log('DispProduct',DispProduct)
      console.log('DispCustomer:',DispCustomer)
    }
  }

  return (
    <div>PurchasesComp <br/><br/>
      <select  onChange={(e)=>setselected_Cust(e.target.value)}>
      <option value="">-- Select Customer --</option>
        {customers.map((cust,index)=>
          <option key={index} value={cust.id}>{cust.FirstName} {cust.LastName}</option>
        )}
       </select>
      <select  onChange={(e)=>setselected_Prod(e.target.value)}>
      <option value="">-- Select Product --</option>
        {products.map((prod,index)=>
          <option key={index} value={prod.id}>{prod.Name}</option>
        )} 
      </select>
      <input type="date" onClick={handleDateChange} ref={dateInputRef}/><br/>
      <button onClick={handleSearch}>Search</button>
      <br/><br/><br/>

      {tableON &&
        <table>
          <thead>
        <tr >
          <th style={{border:'1px solid black'}}>Customer Name</th>
          <th style={{border:'1px solid black'}}>Products</th>
          <th style={{border:'1px solid black'}}>Purchase Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        {!DispCustomer.length ? (
          <th>
              <li>{DispCustomer.FirstName} {DispCustomer.LastName}</li>
          </th>):(
            <th>
            {DispCustomer.map((cust,index)=>
              <li key={index}>{cust.FirstName} {cust.LastName}</li>
            )}
          </th>
          )}

        {!DispProduct.length ? (
          <th>
              <li>{DispProduct}</li>
          </th>):(
            <th>
            {DispProduct.map((prod,index)=>
              <li key={index}>{prod}</li>
            )}
          </th>
          )}

        {!DispDates.length ? (
          <th>
              <li>{DispDates}</li>
          </th>):(
            <th>
            {DispDates.map((date,index)=>
              <li key={index}>{date}</li>
            )}
          </th>
          )}

        </tr>
      </tbody>

        </table>
      }

    </div>
  )
}

export default PurchasesComp