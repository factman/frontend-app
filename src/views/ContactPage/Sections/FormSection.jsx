import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import PinDrop from "@material-ui/icons/PinDrop";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Email from "@material-ui/icons/Email";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";

import workStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/workStyle";
import { primaryColor } from "../../../assets/jss/material-kit-react";

class FormSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, vendor } = this.props;
    const { address } = vendor;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={5}>
            <h2 className={classes.title}>
              Get in Touch
            </h2>
            <h4 style={{ textAlign: "center" }}>
              {"You can contact us with anything related to our Products. We'll get in touch with you as soon as possible."}
            </h4>
            <form>
              <GridContainer>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Your Email Address"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Your Phone Number"
                    id="tel"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <CustomInput
                  labelText="Your Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                  }}
                />
                <GridContainer justify="center">
                  <GridItem
                    xs={10}
                    className={classes.textCenter}
                  >
                    <Button color="primary">
                      Send Message
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
          </GridItem>

          <GridItem xs={12} sm={12} md={2} />

          <GridItem xs={12} sm={12} md={5}>
            <GridContainer>
              <GridItem xs={12} sm={12}>
                <h2 className={classes.title}>
                  Contact Information
                </h2>
                <h4 style={{ textAlign: "center" }}>
                  {"You need more information? Check what other persons are saying about our product. They are very happy with their purchase."}
                </h4>
              </GridItem>
              <GridItem xs={1}>
                <PinDrop style={{ marginTop: "20px", fontSize: "2.5em", color: primaryColor }} />
              </GridItem>
              <GridItem xs={11}>
                <h3 className={classes.title} style={{ marginBottom: 10, textAlign: "left" }}>
                  &nbsp;Find us at
                </h3>
                <h4>
                  {`${address.building}, ${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                </h4>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={1}>
                <LocalPhone style={{ marginTop: "20px", fontSize: "2.5em", color: primaryColor }} />
              </GridItem>
              <GridItem xs={11}>
                <h3 className={classes.title} style={{ marginBottom: 10, textAlign: "left" }}>
                  &nbsp;Give us a call
                </h3>
                <h4>
                  {vendor.phone}
                </h4>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={1}>
                <Email style={{ marginTop: "20px", fontSize: "2.5em", color: primaryColor }} />
              </GridItem>
              <GridItem xs={11}>
                <h3 className={classes.title} style={{ marginBottom: 10, textAlign: "left" }}>
                  &nbsp;Email us at
                </h3>
                <h4>
                  {vendor.email}
                </h4>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(FormSection);
