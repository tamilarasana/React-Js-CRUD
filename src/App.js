import React, { useState,useEffect } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItems from "./AddItems";
import SearchItem from "./SearchItem";


function App() {
  const API_URL = 'http://localhost:3500/item';
  const [items, setItems] = useState([]);

  const [newItem ,setNewItem]  = useState('')
  const [search,  setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isloading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchItems = async () =>{
      try {
         const response = await fetch(API_URL);
         if(!response.ok) throw Error ("Data Not Received");
         const  listItems = await response.json();
         setItems(listItems) 
         setFetchError(null) 
      }catch (err) {
        setFetchError(err.message);
      }finally {
        setIsLoading(false)
      }
    }

    setTimeout (() =>{
      (async () => await fetchItems())()
    }, 2000)

  },[])

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return
    addItem(newItem)
    setNewItem('')
  }

  

  const addItem = (item) => {
    const id  = items.length ? items[items.length -1].id + 1 : 1
    console.log(id);
    const addNewItem  = {id, checked:false, item}
    const listItems = [...items, addNewItem]
    setItems(listItems)

  }

  return (
    <div>
      <Header title="Course List" />
      <AddItems 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
        search = {search}
        setSearch = {setSearch}
      />
      <main>
        {fetchError && <p> {`Error: ${fetchError}`}</p>}
      <Content
        items = {items.filter(item =>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete} 

      />
      </main>
      <Footer
      length = {items.length} 
      />
    </div>
  );
}

export default App;
