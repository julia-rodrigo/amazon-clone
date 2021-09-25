// the dataLayer

export const initialState = {
    basket: [],
    user: null
  };
  
  // Selector
  
  export const getBasketTotal = (basket) =>
                       // get item price and add to amount, the amount initially is 0
      basket?.reduce((amount, item) => item.price + amount, 0)
  
  const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_BASKET': // recieve add to basket action (button pressed)
            return {
                ...state, // whatever the state originally was
                basket: [...state.basket, action.item], 
                // current basket plus the added item
            };
      
        case 'EMPTY_BASKET':
        return {
          ...state,
          basket: []
        }

        case 'EMPTY_BASKET':
          return {
            ...state, // keep whatever was inside of it
            basket: [] // change the basket back to an empty array
          }
  
        case "REMOVE_FROM_BASKET": 
        const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id
        );
        let newBasket = [ ...state.basket];
        if (index >= 0) { 
            newBasket.splice (index, 1);
            // go to the basket and cut out this ONE element: SPLICE
        }
        else {
            console.warn(
                `Cant remove product (id: ${action.id}) as its not in the basket!`
            )
        }
  
        return {
            ...state, // current state
            basket: newBasket // new basket update
        }
      
      case "SET_USER":
        return {
          ...state, 
          // current state and then update user
          user: action.user
        }
  
      default:
        return state;
    }
  };
  
  export default reducer;
  