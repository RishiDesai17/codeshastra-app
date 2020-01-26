import React,{createContext,useState} from 'react';

export const Context = createContext({
    myItems: [],
    add: ()=>{}
});

const ContextProvider = props => {
    const [myItems,setItem] = useState();
    const add = (qty,item) => {
        setItem(y => [...y, {
            food: item,
            qty: qty
        }]);
    }
      return(
          <Context.Provider value={{add: add,myItems:myItems}}>
              {props.children}
          </Context.Provider>
      )
}

export default ContextProvider;