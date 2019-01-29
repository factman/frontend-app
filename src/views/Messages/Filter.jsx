// @desc Filter for 'Messages' Component; another pagination found on the header of the 'Messages' componene
// @author Sylvia Onwukwe
import React from "react";

import Paginations from "../../components/Pagination/Pagination";

function Filter({...props}){
  return (
    <Paginations
      pages={[
        { text: "All" },
        { text: "Read" },
        { text: "Unread" },
        { text: "Trash" }
      ]}
      color="primary"
    />
  );
}

export default Filter;
