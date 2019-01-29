// @desc this is the Email Template component on the admin dashboard.
/**
 * @author odewale Ifeoluwa
 * @author Sylvia Onwukwe
 */
import React from "react";
import NavPills from "../../components/NavPills/NavPills";
import PasswordReset from "./PasswordReset/passwordReset";
import AccountRegistration from "./AccountRegistration/account";
import AccountVerification from "./AccountVerification/verification";
import OrderNotification from "./OrderNotification/order";
import Message from "./MessageNotification/notifications";


function EmailTemplate() {
  return (
    <NavPills
      color="primary"
      tabs={[
        {
          tabButton: "Password Reset",
          tabContent: (
            <PasswordReset />
          ),
        },
        {
          tabButton: "Email Template",
          tabContent: (
            <AccountRegistration />
          ),
        },
        {
          tabButton: "Account Verification",
          tabContent: (
            <AccountVerification />
          ),
        },
        {
          tabButton: "Order Notification",
          tabContent: (
            <OrderNotification />
          ),
        },
        {
          tabButton: "Message Notification",
          tabContent: (
            <Message />
          ),
        },
      ]}
    />
  );
}
export default EmailTemplate;
