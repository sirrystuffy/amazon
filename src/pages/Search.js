//Function returns a html form for searching


import React from 'react'
import { useState } from 'react';
import AddItemToItems from '../components/AddItemToItems';
import CheckIfItemExists from '../components/CheckIfItemExists';

export default function Search() {
    const [asin, setAsin] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(asin);
      //This is where we'll use CheckIfItemExists,
      //if(exists) -> AddItemToUser(Item)
      //else -> api(item) -> AddItemToUser(Item)

      checkedItem = CheckIfItemExists({asin: asin});

      if(checkedItem){
        alert("Item already exists");
        AddItemToUser(checkedItem);
      }else{
        //api data
        //AddItemToItems(item)
        //AddItemToUser(item)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Enter the asin:
          <input 
            type="text" 
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    )
}