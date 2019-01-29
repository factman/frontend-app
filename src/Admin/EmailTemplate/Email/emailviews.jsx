import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
import _ from "underscore";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import AddNew from "./modal";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";
import Validator from "../../../helpers/validator";


const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Template Name" },
  { id: "page", numeric: false, disablePadding: true, label: "Page" },
  { id: "admin", numeric: false, disablePadding: true, label: "Created By" },
  { id: "standing", numeric: false, disablePadding: true, label: "Status" },
];

const properties = [
  { name: "name", component: true, padding: true, numeric: false, img: false },
  { name: "page", component: false, padding: false, numeric: false, img: false },
  { name: "admin", subname: "fullname", component: false, padding: false, numeric: false, img: false, adminMap: true },
  { name: "standing", component: false, padding: false, numeric: false, img: false },
];

const mailTemplateDetails = {
  name: "",
  page: "",
  style: "",
};


class Tamplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      variantSnackBar: "success",
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
    };
  }

  componentDidMount() {
    const {
      fetchMailTemplates,
    } = this.props;
    fetchMailTemplates();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps.adminMailTemplate, "mailTemplates")
    && typeof newProps.adminMailTemplate.mailTemplates === "object") {
      this.setState({
        data: newProps.adminMailTemplate.mailTemplates,
      });
    }

    if (Validator.propertyExist(newProps.adminMailTemplate, "addMailTemplate")) {
      if (typeof newProps.adminMailTemplate.addMailTemplate === "string") {
        return false;
      }
      const { data } = this.state;
      // Stringify and parsing all adminMailTemplates
      const newTemplates = JSON.parse(JSON.stringify(data));
      // Added the new adminMailTemplate as the first element
      newTemplates.unshift(newProps.adminMailTemplate.addMailTemplate);
      this.setState({
        data: newTemplates,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully added a new Template",
      });
    }

    if (Validator.propertyExist(newProps.adminMailTemplate, "updateMailTemplate")) {
      if (typeof newProps.adminMailTemplate.updateMailTemplate === "string") {
        this.setState({
          variantSnackBar: "error",
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: newProps.adminMailTemplate.updateMailTemplate,
        });
        return false;
      }
      const { data } = this.state;
      const newTemplates = JSON.parse(JSON.stringify(data));
      const newMailTemplates = newTemplates.map((adminMailTemplate) => {
        if (newProps.adminMailTemplate.updateMailTemplate.id === adminMailTemplate.id) {
          return newProps.adminMailTemplate.updateMailTemplate;
        }
        return adminMailTemplate;
      });
      this.setState({
        data: newMailTemplates,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully updated Template",
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  editButtonDisplay = (n) => {
    const {
      adminMailTemplate, putMailTemplate,
    } = this.props;
    const updateMailTemplateDetails = {
      name: n.name,
      page: n.page,
      style: _.unescape(n.style),
    };
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          adminMailTemplate={adminMailTemplate}
          putMailTemplate={putMailTemplate}
          mailTemplateDetails={updateMailTemplateDetails}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (adminMailTemplateIDs) => {
    const { deleteMailTemplate } = this.props;
    const { data } = this.state;
    adminMailTemplateIDs.forEach((adminMailTemplateID, index) => {
      deleteMailTemplate(adminMailTemplateID);
      if ((index + 1) === adminMailTemplateIDs.length) {
        const newData = data.filter(datum => adminMailTemplateIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${adminMailTemplateIDs.length} ${adminMailTemplateIDs.length === 1 ? "template" : "templates"}`,
        });
      }
    });
  }

  render() {
    const {
      adminMailTemplate,
      postMailTemplate,
    } = this.props;
    const {
      data,
      snackBarMessageSuccess,
      snackBarOpenSuccess,
      variantSnackBar,
    } = this.state;

    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={12} md={2}>
          <AddNew
            type="add"
            adminMailTemplate={adminMailTemplate}
            postMailTemplate={postMailTemplate}
            mailTemplateDetails={mailTemplateDetails}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>
                All Email Template
              </h4>
              <p>
                List of All Email Template
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Templates"
                properties={properties}
                editButton={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                id="id"
                adminMailTemplate={adminMailTemplate}
                itemName={{ single: "Template", plural: "Templates" }}
              />
            </CardBody>
          </Card>
        </GridItem>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={variantSnackBar}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
      </Grid>
    );
  }
}

export default Tamplate;
