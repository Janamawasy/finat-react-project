import { v4 as uuidv4 } from 'uuid'

const initialState = {
    products: [
      { id: uuidv4(), Name: "Product 1", Price: 10.99, Quantity: 5,},
      { id: uuidv4(), Name: "Product 2", Price: 15.99, Quantity: 3,},
    ],
  customers:[
    { id: uuidv4(), FirstName: "Customer1", LastName: 'lastname1', City: 'tel aviv',},
    { id: uuidv4(), FirstName: "Customer2", LastName: 'lastname2', City: 'haifa',},
  ],
  purchased:[
    { id:'', CustomerId:'', ProductId:'', Date:''}
  ]
};

  const ApplyChange = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PURCHASED': {
              const purchased = [...state.purchased];
              const newPurchase = {
                id: uuidv4(),
                CustomerId: action.payload.CustomerId,
                ProductId: action.payload.ProductId,
                Date: new Date()
              }

              const updatedState = {...state, purchased: [...state.purchased, newPurchase]};
              const updatedProducts = state.products.map(product => {
                if (product.id === action.payload.ProductId) {
                  return { ...product, Quantity: product.Quantity - 1 };
                }
                return product;
              });
            
              updatedState.products = updatedProducts;
              console.log('q',updatedState)
              return updatedState
            }

        case 'UPDATE_PRODUCT': {
            const products = [...state.products];
            const index = products.findIndex((product)=>product.id===action.payload.id)
            console.log(products)
            if (index !== -1) {
                products[index] = action.payload
            }
            return { ...state, products: products };
        }

        case 'DELETE_PRODUCT': { 
            const products = state.products.filter((prod)=>prod.id !== action.payload.id)
            console.log(products)
            return {...state,products}
        }
        
        case 'UPDATE_CUSTOMER': {
          const customers = [...state.customers];
          const index = customers.findIndex((cust)=>cust.id===action.payload.id)
          if (index !== -1) {
            customers[index] = action.payload
            console.log(customers)
          }
          console.log('aaaaaa',{ ...state, customers: customers })
          return { ...state, customers: customers };
      }

      case 'DELETE_CUSTOMER': { 
          const customers = state.customers.filter((cust)=>cust.id !== action.payload.id)
          console.log('customersdelete',customers)
          return {...state,customers}
      }

        default:
            return state;
    }
  }

  export default ApplyChange

