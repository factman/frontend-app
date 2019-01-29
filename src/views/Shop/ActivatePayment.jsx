import React from "react";
import classNames from "classnames";
// import isEqual from "lodash/isEqual";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PlayArrow from "@material-ui/icons/PlayArrow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TableCell from "@material-ui/core/TableCell";
// core components;
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage";
import Validator from "../../helpers/validator";
import DeleteModal from "../../bezopComponents/Modal/deleteTableItem";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import { getJsonString } from "../../helpers/logic";


const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  buttonProgress: {
    position: "absolute",
    marginTop: -12,
    marginLeft: -12,
    color: "#ffffff",
  },
  loadingPosition: {
    top: "50%",
    left: "90%",
  },
  checkIconPosition: {
    top: "5px !important",
    left: "45px",
  },
  checkIconPositionDeny: {
    top: "5px !important",
    left: "53px",
  },
  fullWidth: {
    width: "100%",
    fontSize: "15px",
  },
  RemovePaddingBottom: {
    paddingBottom: "0px",
  },
  RemovePaddingTop: {
    paddingTop: "0px",
  },
  gridSideDev: {
    [theme.breakpoints.up("md")]: {
      borderRight: "1px solid #cccccc",
    },
  },
  ...loginPageStyle,
});

const columnData = [
  { id: "contractAddress", numeric: false, disablePadding: true, label: "Contract Address" },
];

const properties = [
  { name: "contractAddress", component: true, padding: true, numeric: false, img: false },
];

class ActivatePayment extends React.Component {
  constructor(props) {
    super(props);
    const vendorProfile = getJsonString(localStorage["bezop-login:vendor"], "profile");
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      contractHidden: false,
      saveContractActivation: vendorProfile.paymentActivation,
      loading: false,
      openModal: false,
      deployerAddress: Validator.propertyExist(vendorProfile, "publicAddress")
        ? vendorProfile.publicAddress : "0x5C4d3578971225db599c8F5CbaDFB080EBB39168",
      buttonVariable: "DEPLOY CONTRACT ADDRESS",
      data: [],
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    const { fetchUserProfile } = this.props;
    fetchUserProfile();
    this.cardAnimation = setTimeout(
      () => {
        this.setState({ cardAnimaton: "" });
      },
      700,
    );
  }

  componentWillReceiveProps(newProps) {
    // const { vendorProfile } = this.props;
    if (
      Validator.propertyExist(newProps, "vendorProfile", "getProfile", "contractAddress")
    //  && !isEqual(
    //    newProps.vendorProfile.getProfile,
    //    vendorProfile.getProfile,
    //  )
    ) {
      this.setState({
        data: [newProps.vendorProfile.getProfile],
      });
    }

    if (
      Validator.propertyExist(newProps, "vendorProfile", "deployContractAddress")
    //  && !isEqual(
    //    newProps.vendorProfile.deployContractAddress,
    //    vendorProfile.deployContractAddress,
    //  )
    ) {
      if (typeof newProps.vendorProfile.deployContractAddress === "string") {
        this.setState({
          loading: false,
        });
      }
    }

    if (
      Validator.propertyExist(newProps, "vendorProfile", "saveDeployContractAddress")
    //  && !isEqual(
    //    newProps.vendorProfile.saveDeployContractAddress,
    //    vendorProfile.saveDeployContractAddress,
    //  )
    ) {
      if (typeof newProps.vendorProfile.saveDeployContractAddress === "string") {
        this.setState({
          loading: false,
        });
        return false;
      }
      this.setState({
        data: [newProps.vendorProfile.saveDeployContractAddress],
        loading: false,
        contractHidden: true,
      });
    }
    if (
      Validator.propertyExist(newProps, "vendorProfile", "contractStatus")
    //  && !isEqual(
    //    newProps.vendorProfile.contractStatus,
    //    vendorProfile.contractStatus,
    //  )
    ) {
      if (typeof newProps.vendorProfile.contractStatus === "string") {
        this.setState({
          loading: false,
        });
        return false;
      }
      this.setState({
        saveContractActivation: true,
      });
      const updatedVendorProfile = { ...JSON.parse(localStorage["bezop-login:vendor"]), ...{ profile: { paymentActivation: true } } };
      localStorage.setItem("bezop-login:vendor", JSON.stringify(updatedVendorProfile));
    }

    if (
      Validator.propertyExist(newProps, "vendorProfile", "saveContractStatus")
    //  && !isEqual(
    //    newProps.vendorProfile.saveContractStatus,
    //    vendorProfile.saveContractStatus,
    //  )
    ) {
      if (typeof newProps.vendorProfile.saveContractStatus === "string") {
        this.setState({
          loading: false,
        });
        return false;
      }
      this.setState({
        data: [newProps.vendorProfile.saveDeployContractAddress],
        loading: false,
      });
    }
    return false;
  }

  // This is use to stop setTimeout
  // in case user leave the page before the setTimout occur
  // This prevent memory leakage
  componentWillUnmount() {
    clearTimeout(this.cardAnimation);
  }

  deployContractHandler = () => {
    const { deployContract } = this.props;
    const { deployerAddress } = this.state;
    this.setState({
      loading: true,
      openModal: false,
    });
    deployContract({ deployerAddress });
  }

  activateContractHandler = (contractAddress) => {
    const {
      contractStatus,
      saveContractStatus,
    } = this.props;
    const {
      deployerAddress,
      saveContractActivation,
    } = this.state;
    this.setState({
      loading: true,
      openModal: false,
    });
    if (!saveContractActivation) {
      contractStatus({ contractAddress, vendorAddress: deployerAddress });
    } else {
      saveContractStatus();
    }
  }

  onOpenDeleleModal = () => {
    this.setState({
      openModal: true,
    });
  }

  actionItem = n => (
    <TableCell>
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.activateContractHandler(n.contractAddress)}
        style={{ marginBottom: "10px" }}
      >
        {n.paymentActivation ? "Already Activated" : "Activate Contract"}
      </Button>
    </TableCell>
  )

  render() {
    const { classes } = this.props;
    const {
      cardAnimaton,
      loading,
      buttonVariable,
      openModal,
      data,
      contractHidden,
    } = this.state;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>
                        Activate Payment
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem md={5} className={classes.gridSideDev}>
                        <Typography variant="title">
                          Useful Tips on Contract Deployment
                        </Typography>
                        <List>
                          <ListItem style={{ padding: "2px 0px" }}>
                            <PlayArrow style={{ fontSize: "1em" }} />
                            &nbsp;
                            <Typography variant="body1" align="justify">
                              {'Click the "DEPLOY CONTRACT ADDRESS" button to deploy your Contract Address'}
                            </Typography>
                          </ListItem>
                          <ListItem style={{ padding: "2px 0px" }}>
                            <PlayArrow style={{ fontSize: "1em" }} />
                            &nbsp;
                            <Typography variant="body1" align="justify">
                              When you finish deploying your contract address,
                              the DEPLOY CONTRACT ADDRESS button
                              will change to ACTIVATE CONTRACT ADDRESS button.
                              Click the button to activate the contract address
                            </Typography>
                          </ListItem>
                        </List>
                      </GridItem>
                      <GridItem md={7}>
                        <div className={classes.wrapper} style={{ textAlign: "center" }}>
                          <DeleteModal
                            mainTitle="Contract Address Deployment"
                            mainCtn="Contract Address comes with the use of gas"
                            buttonCtn="Deploy Contract Address"
                            onDeleteItem={this.deployContractHandler}
                            openModal={openModal}
                          >
                            <Button
                              color="primary"
                              size="lg"
                              onClick={() => this.onOpenDeleleModal()}
                              disabled={contractHidden}
                            >
                              {loading && (
                              <CircularProgress
                                size={24}
                                className={
                                  classNames({
                                    [classes.buttonProgress]: true,
                                    [classes.loadingPosition]: true,
                                  })}
                              />)}
                              {buttonVariable}
                            </Button>
                          </DeleteModal>
                          <EnhancedTable
                            orderBy="name"
                            columnData={columnData}
                            data={data}
                            tableTitle="All Vendor Contract Addresses"
                            properties={properties}
                            currentSelected={[]}
                            disableCheckBox
                            actionItem={this.actionItem}
                            noPagination
                            noTableToolBar
                          />
                        </div>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ActivatePayment);
