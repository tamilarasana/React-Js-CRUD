import React from "react";
import ItmeList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {

  return (
    <>
      {(items.length) ? (
        <ItmeList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your List is empty</p>
      )
    }
    </>
  )
}

export default Content;
