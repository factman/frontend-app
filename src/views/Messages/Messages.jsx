// @desc This is the message component; vendors can view, send or delete messages from here
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Filter from "./Filter";
import AddNew from "./AddNew";
import ReadMore from "./ReadMore";
import DeleteMessage from "./DeleteMessage";
import MessagePages from "./Pagination";


function Messages(props) {
  const { classes } = props;
  return (
    <Grid container>
      <GridItem xs={12} md={10}>
        <Filter />
      </GridItem>
      <GridItem xs={6} md={2}>
        <AddNew />

      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              Messages
            </h4>
            <p className={classes.cardCategoryWhite}>
              View Messages
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "", "Subject", "", "Type", "", "Sender", "", "Status", "", "Email Address"]}
              tableData={[
                ["001", "", "Black Jean", "", "Contact", "", "Anne Barley", "", "Unread", "", "AnneBarley@example.com", <ReadMore />,
                  <DeleteMessage />],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

      <MessagePages />
    </Grid>
  );
}

export default Messages;
