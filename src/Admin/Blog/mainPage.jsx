// @desc this is the main blog component on the admin dashboard
// displaying all blog and blog categories.
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "vendor", numeric: false, disablePadding: false, label: "Vendor" },
  { id: "standing", numeric: false, disablePadding: false, label: "Standing" },
];

const properties = [
  { name: "title", component: true, padding: true, numeric: false, img: false },
  { name: "vendor", component: true, padding: true, numeric: false, img: false },
  { name: "standing", component: true, padding: true, numeric: false, img: false },
];


class AdminBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
    };
  }

  componentDidMount() {
    const { fetchBlog } = this.props;
    fetchBlog();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminBlog", "blog")) {
      this.setState({
        data: newProps.adminBlog.blog,
      });
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  handleDeleteClick = (blogIDs) => {
    const { deleteBlog } = this.props;
    const { data } = this.state;
    blogIDs.forEach((blogID, index) => {
      deleteBlog(blogID);
      if ((index + 1) === blogIDs.length) {
        const newData = data.filter(datum => blogIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${blogIDs.length} ${blogIDs.length === 1 ? "blog" : "blogs"}`,
        });
      }
    });
  }

  render() {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2}>
          <CustomInput
            labelText="Search..."
            id="blog_search"
            primary
            formControlProps={{
              fullWidth: false,
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>All Blogs</h4>
              <p>List of All Blogs</p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Blogs"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                itemName={{ single: "Blog", plural: "Blogs" }}
                id="id"
              />
            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
            <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
            />
          </Snackbar>
        </GridItem>
      </Grid>
    );
  }
}

export default AdminBlog;
