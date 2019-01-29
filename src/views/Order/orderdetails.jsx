import React from "react";

import NavPills from "../../components/NavPills/NavPills";
import ProductDetails from "./productdetails";
import ShipmentDetails from "./shipmentdetails";
import PaymentDetail from "./paymentdetails";

function OrderDetails({ ...props }) {
  return (
    <NavPills
      color="primary"
      tabs={[
        {
          tabButton: "Product Details",
          tabContent: (
            <ProductDetails />
          ),
        },
        {
          tabButton: "Payment Details",
          tabContent: (
            <PaymentDetail />
          ),
        },
        {
          tabButton: "Shipment Details",
          tabContent: (
            <ShipmentDetails />
          ),
        },
      ]}
    />
  );
}

export default OrderDetails;
