import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-select/dist/react-select.css";


import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CustomInput from "../../components/CustomInput/CustomInput";
import Validator from "../../helpers/validator";
import Creatable from "../../../node_modules/react-select/lib/Creatable";
import BezopEditor from "../../bezopComponents/Editor/BezopEditor";

// The component Style
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    width: "100%",
    margin: "0px",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  input: {
    display: "none",
  },
  fluidButton: {
    ...theme.button,
    width: "100%",
  },
});


class CreateBlog extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      blogDetails: props.blogDetails,
      selectedBlogKind: Validator.propertyExist(props.blogDetails, "kind")
        && props.blogDetails.kind !== ""
        ? {
          value: props.blogDetails.kind,
          label: props.blogDetails.kind.replace(/^\w/, c => c.toUpperCase()),
        } : null,
      blogKindSelect: `react-select-label-${Validator.propertyExist(props.blogDetails, "kind")
        && props.blogDetails.kind !== "" ? "visible" : "hidden"}`,
      selectedBlogTag: Validator.propertyExist(props.blogDetails, "tag")
        ? props.blogDetails.tag.map(tag => ({
          value: tag, label: tag.replace(/^\w/, c => c.toUpperCase()),
        })) : [],
      blogTagSelect: `react-select-label-${Validator.propertyExist(props.blogDetails, "tag")
        && props.blogDetails.tag.length > 0 ? "visible" : "hidden"}`,
    };
  }


  // Setting the state of all input feilds
  setBlogDetails = (type, value) => {
    const { setParentBlogDetails } = this.props;
    const { blogDetails } = this.state;
    const newblogDetails = JSON.parse(JSON.stringify(blogDetails));
    newblogDetails[type] = value;
    this.setState({
      blogDetails: newblogDetails,
    });
    setParentBlogDetails(newblogDetails);
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setBlogDetails(event.target.name, event.target.value);
  };


  // This handles the blog kind select element
  handleBlogKindChange = (selectedBlogKind) => {
    this.setState({ selectedBlogKind });

    const blogKind = selectedBlogKind !== null ? selectedBlogKind.value : "";
    const kindSelect = `react-select-label-${selectedBlogKind !== null ? "visible" : "hidden"}`;
    this.setBlogDetails("kind", blogKind);
    this.setState({
      blogKindSelect: kindSelect,
    });
  }

  // This handles the blog kind select element
  handleBlogTagChange = (selectedBlogTag) => {
    this.setState({ selectedBlogTag });
    this.filterSelectedOption("tag", selectedBlogTag, "blogTagSelect");
  }

  filterSelectedOption = (type, options, selected) => {
    const newSelectedOpt = options.map(opt => opt.value);
    const currentStyle = `react-select-label-${options.length > 0 ? "visible" : "hidden"}`;

    this.setState({
      [selected]: currentStyle,
    });

    this.setBlogDetails(type, newSelectedOpt);
  }

  getJsonContent = (jsonData) => {
    this.setBlogDetails("content", JSON.stringify(jsonData));
  }

  render() {
    const { classes } = this.props;
    const {
      blogDetails,
      blogKindSelect,
      selectedBlogKind,
      blogTagSelect,
      selectedBlogTag,
    } = this.state;

    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
                New Blog Post
              </h4>
            </div>
            <div>
              <p>
                Create New Blog Post
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Blog Title"
                  id="title"
                  inputProps={{
                    value: blogDetails.title,
                    name: "title",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedBlogKind" className={blogKindSelect}>Type or Select Blog Kind</InputLabel>
                  <Select2
                    id="selectedBlogKind"
                    name="selectedBlogKind"
                    value={selectedBlogKind}
                    placeholder="Type or Select Blog Kind"
                    onChange={this.handleBlogKindChange}
                    options={[
                      { value: "post", label: "Post" },
                      { value: "news", label: "News" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl} style={{ marginTop: "15px" }}>
                  <InputLabel htmlFor="selectedBlogTag" className={blogTagSelect}>Type or Select Blog Tags</InputLabel>
                  <Creatable
                    id="selectedBlogTag"
                    name="selectedBlogTag"
                    value={selectedBlogTag}
                    multi
                    placeholder="Type or Select Blog Tags"
                    onChange={this.handleBlogTagChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12}>
                <CustomInput
                  labelText="Blog Summary"
                  id="summary"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    name: "summary",
                    value: blogDetails.summary,
                    onChange: this.handleChange,
                  }}
                />
              </GridItem>
              <GridItem xs={12}>
                <BezopEditor
                  placeholder="Write blog post"
                  getJsonContent={jsonData => this.getJsonContent(jsonData)}
                  returnJson={blogDetails.content !== "" ? blogDetails.content : null}
                />
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(CreateBlog);
