import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";

import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

class AddCoupon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  state = {
    age: "",
    name: "hai",
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
   this.cardAnimation = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillMount (){
    clearTimeout (this.cardAnimation)
  }
  render(){

    return (
      <div>
          <div>
          <Card>
            <CardHeader color="primary">
              <h4>Create New Coupon</h4>
              <p>Discount Coupons</p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Title"
                    id="coupon-title"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="tag"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps ={{
                      type: "date"
                    }}
                  />
                  <InputAdornment> Valid Till </InputAdornment>
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Code"
                    id="coupon-code"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Value"
                    id="coupon-value"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{type:"number"}}
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={12}>
          <InputLabel htmlFor="product-category">Select Product</InputLabel>
          <Select
            native
            value={this.state.category}
            onChange={this.handleChange("category")}
            inputProps={{
              name: "category",
              id: "product-category",
            }}
          >
            <option value="" />
            <option value={10}>Automobile</option>
            <option value={20}>Fashion</option>
            <option value={30}>Furniture</option>
            <option value={40}> Gadgets </option>
          </Select>
        
      </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="product-description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3
                    }}
                  />
                  <InputAdornment> Short Description </InputAdornment>
                </GridItem>
               
  
              </Grid>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </div>
        </div>
    );
  }
}

export default AddCoupon;
