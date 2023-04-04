import { Children, createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// const initialState = {};

const reducerFun = (state, action) => {
  if (action.type === "ADD") {
    return [
      ...state,
      {
        id: action.id,
        name: action.name,
        image: action.image,
        size: action.size,
        qty: action.qty,
        price: action.price,
      },
    ];
  }

  if (action.type === "REMOVE") {
    let newArr = [...state];
    newArr.splice(action.index, 1);
    return newArr;
  }

  if (action.type === "DROP") {
    let empArray = [];
    return empArray;
  }

  if (action.type === "UPDATE") {
    let arr = [...state];
    arr.find((food, index) => {
      if (food.id === action.id) {
        arr[index] = {
          ...food,
          qty: parseInt(action.qty) + food.qty,
          price: action.price + food.price,
        };
      }
      return arr;
    });
    return arr;
  }
};

export const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducerFun, []);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {Children.toArray(props.children)}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);

export const useDispatch = () => useContext(CartDispatchContext);
