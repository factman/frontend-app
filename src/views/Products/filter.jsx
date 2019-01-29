// @desc This is the filter above the product table in product.jsx
// @author Sylvia Onwukwe
import React from "react";

import Paginations from "../../components/Pagination/Pagination";

function Filter({...props}){
  return (
    <Paginations
      pages={[
        { text: "Physical Products" },
        { text: "Digital Produts" }
      ]}
      color="info"
    />
  );
}

export default Filter;
