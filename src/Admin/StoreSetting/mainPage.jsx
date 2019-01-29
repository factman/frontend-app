// @desc this is the store settings component on the admin dashboard.
// @author Sylvia Onwukwe
import React from "react";

import NavPills from "../../components/NavPills/NavPills";
import TermsAndConditions from "./TermsAndConditions/termsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy/privacyPolicy";



class AdminStore extends React.Component{
  render (){
  return (
    <NavPills 
      color="primary"
      tabs={[
          {
            tabButton: "Terms And Conditions",
            tabContent: (
                 <TermsAndConditions />
            )
          },
          {
            tabButton: "Privacy Policy",
            tabContent: (
                 <PrivacyPolicy />
            )
          },
      ]}
    />
  );
}
}
export default AdminStore;