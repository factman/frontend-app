// @desc this is the 'store setiings' componenent
// @author Sylvia Onwukwe
import React from "react";

import NavPills from "../../components/NavPills/NavPills";
import Subscribers from "../../containers/Admin/Subscribers";
import SendNewsletter from "./NewsLetter/newsletters";
import ContactForm from "./ContactForm/contactForm";
import SupportTicket from "./SupportTicket/supportTicket";

class AdminMessage extends React.Component {
  state = {};

  render() {
    return (
      <NavPills
        color="primary"
        tabs={[
          {
            tabButton: "All Subscribers",
            tabContent: (
              <Subscribers />
            ),
          },
          {
            tabButton: "Newsletters",
            tabContent: (
              <SendNewsletter />
            ),
          },
          {
            tabButton: "Contact Form",
            tabContent: (
              <ContactForm />
            ),
          },
          {
            tabButton: "Support Tickets",
            tabContent: (
              <SupportTicket />
            ),
          },
        ]}
      />
    );
  }
}
export default AdminMessage;
