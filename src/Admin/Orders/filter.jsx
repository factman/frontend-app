// @desc This is the filter on Admin Order Component filtering completed, processing and pending orders
// @author Sylvia Onwukwe
import React from "react";

import Paginations from "../../components/Pagination/Pagination";

class Filter extends React.Component{
  render (){
  return (
    <Paginations
      pages={[
        { text: "Completed" },
        { text: "Processing" },
        { text: "Pending"}
      ]}
      color="info"
    />
  );
}
}
export default Filter;
