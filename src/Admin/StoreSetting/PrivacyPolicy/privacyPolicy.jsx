// @desc This is the Privacy Policy Component
// @author Sylvia Onwukwe
import React from "react";
import Grid from "@material-ui/core/Grid";

import InputAdornment from "@material-ui/core/InputAdornment";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
    };
  }

  componentWillMount() {
    clearTimeout(this.cardAnimation);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimation = setTimeout(
      () => {
        this.setState({ cardAnimaton: "" });
      },
      700,
    );
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <Card>
            <CardHeader color="primary">
              <h4>
                {" "}
Privacy Policy
              </h4>
              <p>
Update Site Privacy Policy
              </p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="privacy-policy"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 20,
                    }}
                  />
                  <InputAdornment>
                    {" "}
Privacy Policy
                  </InputAdornment>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Button color="primary">
                {" "}
Update
                {" "}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;
