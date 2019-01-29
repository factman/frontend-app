import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-select/dist/react-select.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import isEqual from "lodash/isEqual";
// core components
import checkboxAdnRadioStyle from "../../assets/jss/material-kit-react/checkboxAdnRadioStyle";

import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CustomInput from "../../components/CustomInput/CustomInput";
import Validator from "../../helpers/validator";

// The component Style
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    width: "100%",
    margin: "0px",
    marginTop: "10px",
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
  marginTopFormControl: {
    ...theme.MuiFormControl,
  },
  ...checkboxAdnRadioStyle,
});

class SliderForm extends React.Component {
  constructor(props) {
    super(props);
    const { sliderDetails } = this.props;
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      sliderDetails,
      selectedSliderKind: Validator.propertyExist(sliderDetails, "kind") && sliderDetails.kind !== "" ? { value: sliderDetails.kind, label: sliderDetails.kind.replace(/^\w/, c => c.toUpperCase()) } : null,
      sliderKindSelect: `react-select-label-${Validator.propertyExist(sliderDetails, "kind") && sliderDetails.kind !== "" ? "visible" : "hidden"}`,
      selectedSliderPlace: Validator.propertyExist(sliderDetails, "place") && sliderDetails.place !== "" ? { value: sliderDetails.place, label: sliderDetails.place.replace(/^\w/, c => c.toUpperCase()) } : null,
      sliderPlaceSelect: `react-select-label-${Validator.propertyExist(sliderDetails, "place") && sliderDetails.place !== "" ? "visible" : "hidden"}`,
    };
  }

  componentWillReceiveProps(newProps) {
    const { sliderDetails, slider } = this.props;
    if (Validator.propertyExist(newProps, "slider", "addSlider")
      && !isEqual(slider.addSlider, newProps.slider.addSlider)) {
      if (typeof newProps.slider.addSlider === "string") {
        return false;
      }
      this.setState({
        sliderDetails,
        selectedSliderKind: null,
        selectedSliderPlace: null,
      });
    }

    if (Validator.propertyExist(newProps, "slider", "updateSlider")
      && !isEqual(slider.updateSlider, newProps.slider.updateSlider)) {
      if (typeof newProps.slider.updateSlider === "string") {
        return false;
      }
    }
    return false;
  }

  // Setting the state of all input feilds
  setSliderDetails = (type, value, parent = null) => {
    const { setParentSliderDetails } = this.props;
    const { sliderDetails } = this.state;
    const newsliderDetails = JSON.parse(JSON.stringify(sliderDetails));
    if (parent !== null) {
      newsliderDetails[parent][type] = value;
    } else {
      newsliderDetails[type] = value;
    }
    this.setState({
      sliderDetails: newsliderDetails,
    });
    setParentSliderDetails(newsliderDetails);
  }

  handleCheckboxChange = (event) => {
    const names = event.target.name.split("|");
    const boolVal = event.target.value === "unchecked";
    if (names.length === 1) {
      this.setSliderDetails(names[0], boolVal);
    } else {
      this.setSliderDetails(names[0], boolVal, names[1]);
    }
  }

  // Get the value of Input Element
  handleChange = (event) => {
    console.log(event.target.value);
    this.setSliderDetails(event.target.name, event.target.value);
  };


  // This handles the slider kind select element
  handleSliderChange = (type, selectedSlider, name, sliderSelect) => {
    this.setState({
      [type]: selectedSlider,
    });

    const sliderTypeValue = selectedSlider !== null ? selectedSlider.value : "";


    const selected = `react-select-label-${selectedSlider !== null ? "visible" : "hidden"}`;

    this.setSliderDetails(name, sliderTypeValue);
    this.setState({
      [sliderSelect]: selected,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      sliderDetails,
      sliderKindSelect,
      selectedSliderKind,
      sliderPlaceSelect,
      selectedSliderPlace,
    } = this.state;

    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
                New Slider Post
              </h4>
            </div>
            <div>
              <p>
                Create New Slider Post
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Slider Name"
                  id="name"
                  inputProps={{
                    value: sliderDetails.name,
                    name: "name",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedSliderKind" className={sliderKindSelect}>
                    Type or Select Slider Kind
                  </InputLabel>
                  <Select2
                    id="selectedSliderKind"
                    name="selectedSliderKind"
                    value={selectedSliderKind}
                    placeholder="Type or Select Slider Kind"
                    onChange={currentSelected => this.handleSliderChange("selectedSliderKind", currentSelected, "kind", "sliderKindSelect")}
                    options={[
                      { value: "text", label: "Text" },
                      { value: "image", label: "Image" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedSliderPlace" className={sliderPlaceSelect}>
                    Type or Select Slider Position
                  </InputLabel>
                  <Select2
                    id="selectedSliderPlace"
                    name="selectedSliderPlace"
                    value={selectedSliderPlace}
                    placeholder="Type or Select Slider Position"
                    onChange={currentSelected => this.handleSliderChange("selectedSliderPlace", currentSelected, "place", "sliderPlaceSelect")}
                    options={[
                      { value: "top", label: "Top" },
                      { value: "middle", label: "Middle" },
                      { value: "bottom", label: "Bottom" },
                    ]}
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <h4>
              Select Page(s)
            </h4>
            <Grid container>
              <GridItem xs={12} sm={12} md={3}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={sliderDetails.page.product}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                      }}
                      value={sliderDetails.page.product === true ? "checked" : "unchecked"}
                      inputProps={{
                        name: "product|page",
                      }}
                    />
                  )}
                  label="Product"
                  className={classes.marginTopFormControl}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={sliderDetails.page.brand}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                      }}
                      value={sliderDetails.page.brand === true ? "checked" : "unchecked"}
                      inputProps={{
                        name: "brand|page",
                      }}
                    />
                )}
                  label="Brand"
                  className={classes.marginTopFormControl}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={sliderDetails.page.category}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                      }}
                      value={sliderDetails.page.category === true ? "checked" : "unchecked"}
                      inputProps={{
                        name: "category|page",
                      }}
                    />
                )}
                  label="Category"
                  className={classes.marginTopFormControl}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={sliderDetails.page.blog}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                      }}
                      value={sliderDetails.page.blog === true ? "checked" : "unchecked"}
                      inputProps={{
                        name: "blog|page",
                      }}
                    />
                )}
                  label="Blog"
                  className={classes.marginTopFormControl}
                />
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SliderForm);
