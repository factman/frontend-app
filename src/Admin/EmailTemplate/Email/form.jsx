import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Select2 from "react-select";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
// material-ui components
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import CardFooter from "../../../components/Card/CardFooter";
// core components
import Button from "../../../components/CustomButtons/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Validator from "../../../helpers/validator";
import { CircularProgress, withStyles, FormControl } from "../../../../node_modules/@material-ui/core";
import "react-select/dist/react-select.css";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  fullWidth: {
    // width: "100%",
    fontSize: "14px",
    float: "right",
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
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
});

class AddTemplate extends React.Component {
  constructor(props) {
    super(props);
    const { mailTemplateDetails } = this.props;
    this.state = {
      mailTemplateDetails,
      selectedPage: mailTemplateDetails.page === ""
        ? null : {
          value: mailTemplateDetails.page,
          label: mailTemplateDetails.page.replace(/^\w/, c => c.toUpperCase()),
        },
      selectedPageStyle: `react-select-label-${mailTemplateDetails.page === ""
        ? "hidden" : "visible"}`,
      selectedStanding: Validator.propertyExist(mailTemplateDetails, "standing")
        && mailTemplateDetails.standing !== ""
        ? {
          value: mailTemplateDetails.standing,
          label: mailTemplateDetails.standing.replace(/^\w/, c => c.toUpperCase()),
        } : null,
      selectedStandingStyle: `react-select-label-${Validator.propertyExist(mailTemplateDetails, "standing")
        && mailTemplateDetails.standing !== "" ? "visible" : "hidden"}`,
      snackBarOpen: false,
      snackBarMessage: "",
      loading: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { adminMailTemplate } = this.props;
    if (Validator.propertyExist(newProps, "adminMailTemplate", "addMailTemplate") && !isEqual(adminMailTemplate.addMailTemplate, newProps.adminMailTemplate.addMailTemplate)) {
      if (typeof newProps.adminMailTemplate.addMailTemplate === "string") {
        this.setState({
          snackBarMessage: newProps.adminMailTemplate.addMailTemplate,
          snackBarOpen: true,
          loading: false,
        });
        return false;
      }
      const { onHandleModalClose, mailTemplateDetails } = this.props;
      this.setState({
        mailTemplateDetails,
        selectedPage: null,
      });
      onHandleModalClose();
    }

    if (Validator.propertyExist(newProps, "adminMailTemplate", "updateMailTemplate") && !isEqual(adminMailTemplate.updateMailTemplate, newProps.adminMailTemplate.updateMailTemplate)) {
      if (typeof newProps.adminMailTemplate.updateMailTemplate === "string") {
        this.setState({
          snackBarMessage: newProps.adminMailTemplate.updateMailTemplate,
          snackBarOpen: true,
          loading: false,
        });
        return false;
      }
      const { onHandleModalClose } = this.props;
      this.setState({
        loading: false,
      });
      onHandleModalClose();
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  onChangeSelect = (type, selected) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${selected === null ? "hidden" : "visible"}`,
    });
    const value = selected !== null ? selected.value : "";
    this.setStoreTemplate(type.toLowerCase(), value);
  }

  // Setting the state of all input feilds
  setStoreTemplate = (type, value) => {
    const { mailTemplateDetails } = this.state;
    const newmailTemplateDetails = JSON.parse(JSON.stringify(mailTemplateDetails));
    newmailTemplateDetails[type] = value;
    this.setState({
      mailTemplateDetails: newmailTemplateDetails,
    });
  }

  // Create new Template
  createNewTemplate = () => {
    const { postMailTemplate } = this.props;
    const { mailTemplateDetails } = this.state;
    this.setState({
      loading: true,
    });
    console.log(mailTemplateDetails);
    postMailTemplate(mailTemplateDetails);
  }

  // Update Template
  handleUpdateTemplate = () => {
    const { putMailTemplate, eachData } = this.props;
    const { mailTemplateDetails } = this.state;
    this.setState({
      loading: true,
    });
    putMailTemplate(mailTemplateDetails, eachData.id);
  }

  handleChange = (event) => {
    this.setStoreTemplate(event.target.name, event.target.value);
  };

  render() {
    const {
      mailTemplateDetails,
      selectedPageStyle,
      selectedPage,
      selectedStandingStyle,
      selectedStanding,
      snackBarOpen,
      snackBarMessage,
      loading,
    } = this.state;
    const {
      classes,
      type,
    } = this.props;
    let submitButton;
    let header;
    let subheader;
    switch (type) {
      case "add":
        submitButton = (
          <Button
            color="primary"
            className={classes.fullWidth}
            onClick={this.createNewTemplate}
            disabled={loading}
          >
            Create Template
          </Button>
        );
        header = "Add New Template";
        subheader = "All Currencies";
        break;
      case "edit":
        submitButton = (
          <Button
            color="primary"
            className={classes.fullWidth}
            onClick={this.handleUpdateTemplate}
            disabled={loading}
          >
            Update Template
          </Button>
        );
        header = "Edit Template";
        subheader = `${mailTemplateDetails.name} Template`;
        break;
      default:
        return false;
    }
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
                {header}
              </h4>
            </div>
            <div>
              <p>
                {subheader}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={type === "edit" ? 4 : 6}>
                <CustomInput
                  labelText="Template Name"
                  id="name"
                  inputProps={{
                    value: mailTemplateDetails.name,
                    name: "name",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={type === "edit" ? 4 : 6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedPage" className={selectedPageStyle}>
                    Type or Select Template Page
                  </InputLabel>
                  <Select2
                    id="selectedPage"
                    name="selectedPage"
                    value={selectedPage}
                    placeholder="Type or Select Template Page"
                    onChange={selected => this.onChangeSelect("Page", selected)}
                    options={[
                      { value: "theme", label: "Theme" },
                      { value: "home", label: "Home" },
                      { value: "profile", label: "Profile" },
                      { value: "product", label: "Product" },
                      { value: "details", label: "Details" },
                      { value: "invoice", label: "Invoice" },
                      { value: "ticket", label: "Ticket" },
                      { value: "newsletter", label: "Newsletter" },
                      { value: "mail", label: "Mail" },
                      { value: "notification", label: "Notification" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              { type === "edit" ? (
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedStanding" className={selectedStandingStyle}>
                      Type or Select Template Standing
                    </InputLabel>
                    <Select2
                      id="selectedStanding"
                      name="selectedStanding"
                      value={selectedStanding}
                      placeholder="Type or Select Template Standing"
                      onChange={selected => this.onChangeSelect("Standing", selected)}
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                        { value: "trashed", label: "Trashed" },
                      ]}
                    />
                  </FormControl>
                </GridItem>
              ) : null
              }
              <GridItem xs={12}>
                {/* <BezopEditor
                  placeholder="Insert ejs template"
                  themeEditor="HtmlEditor-editor"
                  getJsonContent={jsonData => this.getJsonContent(jsonData)}
                /> */}
                <CustomInput
                  labelText="Template"
                  id="style"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    name: "style",
                    onChange: this.handleChange,
                    value: mailTemplateDetails.style,
                    multiline: true,
                    rows: 10,
                  }}
                  codeInput
                />
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <div className={classes.wrapper}>
                  {submitButton}
                  {loading && (
                  <CircularProgress
                    size={24}
                    className={
                       classNames({
                         [classes.buttonProgress]: true,
                         [classes.loadingPosition]: true,
                       })}
                  />)}
                </div>
              </GridItem>
            </Grid>
          </CardFooter>
        </Card>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpen}
          onClose={this.onCloseHandler}
        >
          <BezopSnackBar
            onClose={this.onCloseHandler}
            variant="error"
            message={snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}
export default withStyles(styles)(AddTemplate);
