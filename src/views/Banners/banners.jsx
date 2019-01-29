import React from "react";
// @material-ui/core components
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import NewSlider from "./sliderModal";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Slider Name" },
  { id: "kind", numeric: false, disablePadding: true, label: "Slider Kind" },
  { id: "page", numeric: false, disablePadding: true, label: "Slider Page" },
  { id: "place", numeric: false, disablePadding: true, label: "Slider Position" },
  { id: "image", numeric: false, disablePadding: true, label: "Slider Images" },
];

const properties = [
  { name: "name", component: true, padding: true, numeric: false },
  { name: "kind", component: false, padding: false, numeric: false },
  { name: "page", component: false, padding: false, numeric: false, children: ["product", "blog", "category", "brand"] },
  { name: "place", component: false, padding: false, numeric: false },
];

const sliderDetails = {
  name: "",
  kind: "",
  page: {
    category: false,
    brand: false,
    blog: false,
    product: false,
  },
  place: "",
};

const sliderElements = {
  element0: {
    image: "",
    title: "",
    subtitle: "",
  },
  element1: {
    image: "",
    title: "",
    subtitle: "",
  },
  element2: {
    image: "",
    title: "",
    subtitle: "",
  },
  element3: {
    image: "",
    title: "",
    subtitle: "",
  },
  element4: {
    image: "",
    title: "",
    subtitle: "",
  },
  element5: {
    image: "",
    title: "",
    subtitle: "",
  },
  element6: {
    image: "",
    title: "",
    subtitle: "",
  },
  element7: {
    image: "",
    title: "",
    subtitle: "",
  },
  element8: {
    image: "",
    title: "",
    subtitle: "",
  },
  element9: {
    image: "",
    title: "",
    subtitle: "",
  },
};

class Banners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      variantSnackBar: "success",
      snackBarMessageSuccess: "SnackBar Message",
    };
  }

  componentDidMount() {
    const { fetchSliders } = this.props;
    fetchSliders();
  }

  componentWillReceiveProps(newProps) {
    const { data } = this.state;
    if (Validator.propertyExist(newProps, "slider", "getSlider")) {
      if (typeof newProps.slider.getSlider === "string") {
        return false;
      }
      this.setState({
        data: newProps.slider.getSlider,
      });
    }

    if (Validator.propertyExist(newProps, "slider", "addSlider")) {
      if (typeof newProps.slider.addSlider === "string") {
        return false;
      }
      // Stringify and parsing all sliders
      const newSliders = JSON.parse(JSON.stringify(data));
      // Added the new slider as the first element
      newSliders.unshift(newProps.slider.addSlider);
      this.setState({
        data: newSliders,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully added a new Slider",
      });
    }

    if (Validator.propertyExist(newProps, "slider", "updateSlider")) {
      if (typeof newProps.slider.updateSlider === "string") {
        return false;
      }
      // Stringify and parsing all sliders
      const updatedSliders = JSON.parse(JSON.stringify(data));
      // Added the new slider as the first element
      const newUpdateSliders = updatedSliders.map((slider) => {
        if (newProps.slider.updateSlider.id === slider.id) {
          return newProps.slider.updateSlider;
        }
        return slider;
      });
      this.setState({
        data: newUpdateSliders,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully updated the Slider",
      });
    }

    if (Validator.propertyExist(newProps, "slider", "updateImage")) {
      if (typeof newProps.slider.updateImage === "string") {
        return false;
      }
      // Stringify and parsing all sliders
      const imageSliders = JSON.parse(JSON.stringify(data));
      // Added the new slider as the first element
      const newImageSliders = imageSliders.map((slider) => {
        if (newProps.slider.updateImage.id === slider.id) {
          return newProps.slider.updateImage;
        }
        return slider;
      });
      this.setState({
        data: newImageSliders,
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }

  sliderDisplay = (n) => {
    const { postImage, slider } = this.props;
    const newArrayElements = Object.keys(n.elements)
      .map(element => ({ ...sliderElements[element], ...n.elements[element] }));

    return (
      <TableCell>
        <NewSlider
          type="image"
          postImage={postImage}
          slider={slider}
          eachData={n}
          elements={newArrayElements}
          height={400}
          width={1200}
        />
      </TableCell>
    );
  }

  editButtonDisplay = (n) => {
    const { putSliderDetails, slider } = this.props;
    const updatedSlider = {
      name: n.name,
      kind: n.kind,
      place: n.place,
      page: {
        category: Validator.propertyExist(n, "page", "category") && n.page.category,
        brand: Validator.propertyExist(n, "page", "brand") && n.page.brand,
        blog: Validator.propertyExist(n, "page", "blog") && n.page.blog,
        product: Validator.propertyExist(n, "page", "product") && n.page.blog,
      },
    };
    return (
      <TableCell>
        <NewSlider
          type="edit"
          putSliderDetails={putSliderDetails}
          slider={slider}
          eachData={n}
          sliderDetails={updatedSlider}
        />
      </TableCell>
    );
  }


  handleDeleteClick = (sliderIDs) => {
    const { deleteSlider } = this.props;
    const { data } = this.state;
    sliderIDs.forEach((sliderID, index) => {
      deleteSlider(sliderID);
      if ((index + 1) === sliderIDs.length) {
        const newData = data.filter(datum => sliderIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${sliderIDs.length} ${sliderIDs.length === 1 ? "slider" : "sliders"}`,
        });
      }
    });
  }

  render() {
    const { classes, postSliderDetails, slider } = this.props;
    const { data, snackBarMessageSuccess, snackBarOpenSuccess, variantSnackBar } = this.state;
    console.log(data);
    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2}>
          <NewSlider
            type="add"
            postSliderDetails={postSliderDetails}
            slider={slider}
            sliderDetails={sliderDetails}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Slider
              </h4>
              <p className={classes.cardCategoryWhite}>
                Manage Slider
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Sliders"
                properties={properties}
                editButton={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                collection="slider"
                sliderDisplay={this.sliderDisplay}
                itemName={{ single: "Slider", plural: "Sliders" }}
                id="id"
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

export default Banners;
