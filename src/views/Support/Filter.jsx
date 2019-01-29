// @desc this is the filter on the support componenent
// @author Sylvia Onwukwe
import React from "react";

import Paginations from "../../components/Pagination/Pagination";

function Filter({ ...props }) {
  return (
    <Paginations
      pages={[
        { text: "All Tickets" },
        { text: "Open Tickets" },
        { text: "Closed Tickets" },
      ]}
      color="info"
    />
  );
}

export default Filter;
