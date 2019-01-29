import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";

import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

class CreateStock extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  state = {
    age: "",
    name: "",
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


  //This is use to stop setTimeout 
  //in case user leave the page before the setTimout occur
  //This prevent memory leakage
  componentWillUnmount(){
    clearTimeout(this.cardAnimation);
  }

  render(){

    return (
      <div>
          <div>
          <Card>
            <CardHeader color="primary">
              <h4>Create New Stock</h4>
              <p>Fill the form:</p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Product ID"
                    id="product_name"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Quantity"
                    id="quantity"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{type:"number"}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cost Price"
                    id="cost-price"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{type:"number"}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Selling price"
                    id="selling=price"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number"
                    }}
                  />
                </GridItem>
               
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Short Description</InputLabel>
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

export default CreateStock;
