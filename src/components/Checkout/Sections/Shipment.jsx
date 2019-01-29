import React from "react";
import LocalShipping from "@material-ui/icons/LocalShipping";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Hidden from "@material-ui/core/Hidden";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import CustomInput from "../../CustomInput/CustomInput";
import Button from "../../CustomButtons/Button";

class Shipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      orderShipment,
      setShipmentValues,
      saveShipment,
      saveShipmentStatus,
      loading,
      placeOrder,
    } = this.props;
    return (
      <div>
        <Hidden smDown>
          <h2 className={classes.header}>
            <LocalShipping className={classes.cartIcon} />
            &nbsp;
            Shipping Details
          </h2>
        </Hidden>
        <Hidden mdUp>
          <h3 className={classes.header}>
            <LocalShipping className={classes.cartIcon} />
            &nbsp;
            Shipping Details
          </h3>
        </Hidden>
        <GridContainer>
          <GridItem sm={12}>
            <CustomInput
              labelText="Full Name"
              id="fullname"
              value={orderShipment.fullname}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Email Address"
              id="email"
              value={orderShipment.email}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Phone Number"
              id="phone"
              value={orderShipment.phone}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Zip"
              id="zip"
              value={orderShipment.shipping.zip}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Country"
              id="country"
              value={orderShipment.shipping.country}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="State"
              id="state"
              value={orderShipment.shipping.state}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="City"
              id="city"
              value={orderShipment.shipping.city}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Street"
              id="street"
              value={orderShipment.shipping.street}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="building"
              id="building"
              value={orderShipment.shipping.building}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
            />
          </GridItem>
          <GridItem sm={12}>
            <CustomInput
              labelText="Delivery Note"
              id="note"
              value={orderShipment.note}
              formControlProps={{
                fullWidth: true,
                onChange: event => setShipmentValues(event),
                required: true,
              }}
              inputProps={{
                multiline: true,
                rows: 3,
              }}
            />
          </GridItem>
          <GridItem sm={12}>
            {saveShipment ? (
              <Button
                color="primary"
                round
                disabled={loading}
                onClick={() => placeOrder()}
              >
                <strong>
                  {loading ? "Processing Order..." : "Place Order"}
                  &nbsp;
                  <ChevronRight />
                </strong>
              </Button>)
              : (
                <Button
                  color="primary"
                  round
                  onClick={() => saveShipmentStatus()}
                >
                  <strong>
                    Save Shipment Detail
                    &nbsp;
                    <ChevronRight />
                  </strong>
                </Button>)}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Shipment;
