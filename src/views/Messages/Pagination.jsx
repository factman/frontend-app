// @desc This is the pagination found at the footer of the "Messages" component
// @author Sylvia Onwukwe
import React from "react";

import Paginations from "../../components/Pagination/Pagination";

function MessagePages({...props}){
  return (
    <Paginations 
      pages={[
        { text: "PREV" },
        { active: true, text: 1 },
        { text: 2 },
        { text: 3 },
        { text: 4 },
        { text: 5 },
        { text: "NEXT" }
      ]}
      color="primary"
    />
  );
}

export default MessagePages;