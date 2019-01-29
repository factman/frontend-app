import React from "react";
// import isEqual from "lodash/isEqual";

import NavPills from "../../components/NavPills/NavPills";
import HomePage from "./homepage";
import SocialMedia from "./socialmedia";
import SEO from "./seo";
import ActivatePayment from "./ActivatePayment";
import GeneralSettings from "./generalSettings";
import { Snackbar } from "../../../node_modules/@material-ui/core";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarVariant: "error",
    };
  }

  componentWillReceiveProps(newProps) {
    const {
      saveDeployContract,
      saveContractStatus,
    } = this.props;
    if (
      Validator.propertyExist(newProps, "vendorProfile", "deployContractAddress")
    ) {
      if (typeof newProps.vendorProfile.deployContractAddress === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.vendorProfile.deployContractAddress,
          snackBarVariant: "error",
        });
        return false;
      }
      if (newProps.vendorProfile.deployContractAddress.data !== undefined) {
        saveDeployContract({ contractAddress: newProps.vendorProfile.deployContractAddress.data });
      }
    }

    if (
      Validator.propertyExist(newProps, "vendorProfile", "saveDeployContractAddress")
    ) {
      if (typeof newProps.vendorProfile.saveDeployContractAddress === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.vendorProfile.saveDeployContractAddress,
          snackBarVariant: "error",
        });
        return false;
      }

      const updatedVendorProfile = { ...JSON.parse(localStorage["bezop-login:vendor"]), ...{ profile: newProps.vendorProfile.saveDeployContractAddress } };
      localStorage.setItem("bezop-login:vendor", JSON.stringify(updatedVendorProfile));

      this.setState({
        snackBarOpen: true,
        snackBarMessage: "You have successfully deploy contract",
        snackBarVariant: "success",
      });
    }
    if (
      Validator.propertyExist(newProps, "vendorProfile", "contractStatus")
    ) {
      if (typeof newProps.vendorProfile.contractStatus === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.vendorProfile.contractStatus,
          snackBarVariant: "error",
        });
        return false;
      }
      if (
        Validator.propertyExist(newProps.vendorProfile.contractStatus, "data")
      && newProps.vendorProfile.contractStatus.data !== undefined
      ) {
        saveContractStatus();
      }
    }

    if (
      Validator.propertyExist(newProps, "vendorProfile", "saveContractStatus")
    ) {
      if (typeof newProps.vendorProfile.saveContractStatus === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.vendorProfile.saveContractStatus,
          snackBarVariant: "error",
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "You have successfully activate contract address",
        snackBarVariant: "success",
      });
      const updatedVendorProfile = { ...JSON.parse(localStorage["bezop-login:vendor"]), ...{ profile: newProps.vendorProfile.saveDeployContractAddress } };
      localStorage.setItem("bezop-login:vendor", JSON.stringify(updatedVendorProfile));
    }

    if (
      Validator.propertyExist(newProps, "vendorProfile", "updateProfile")
    ) {
      if (typeof newProps.vendorProfile.updateProfile === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.vendorProfile.updateProfile,
          snackBarVariant: "error",
        });
        return false;
      }
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "You have successfully activate contract address",
        snackBarVariant: "success",
      });
    }

    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  render() {
    const {
      deployContract,
      postImage,
      vendorProfile,
      saveDeployContract,
      fetchUserProfile,
      saveContractStatus,
      contractStatus,
      updatedVendorProfile,
    } = this.props;
    const { snackBarOpen, snackBarMessage, snackBarVariant } = this.state;
    return (
      <div>
        <NavPills
          color="primary"
          tabs={[
            {
              tabButton: "GENERAL SETTINGS",
              tabContent: (
                <GeneralSettings
                  postImage={postImage}
                  vendorProfile={vendorProfile}
                  contractStatus={contractStatus}
                  updatedVendorProfile={updatedVendorProfile}
                />
              ),
            },
            {
              tabButton: "ACTIVATE PAYMENTS",
              tabContent: (
                <ActivatePayment
                  deployContract={deployContract}
                  vendorProfile={vendorProfile}
                  saveDeployContract={saveDeployContract}
                  fetchUserProfile={fetchUserProfile}
                  saveContractStatus={saveContractStatus}
                  contractStatus={contractStatus}
                />
              ),
            },
            {
              tabButton: "HOMEPAGE",
              tabContent: (
                <HomePage />
              ),
            },
            {
              tabButton: "Social Media",
              tabContent: (
                <SocialMedia />
              ),
            },
            {
              tabButton: "SEO",
              tabContent: (
                <SEO />
              ),
            },
          ]}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpen}
          onClose={this.onCloseHandler}
        >
          <BezopSnackBar
            onClose={this.onCloseHandler}
            variant={snackBarVariant}
            message={snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default Shop;
