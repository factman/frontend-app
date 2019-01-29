import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";

import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";

import cardImagesStyles from "../../assets/jss/material-kit-react/cardImagesStyles";
import ImagePlaceholder from "./ImagePlaceholder";
import Validator from "../../helpers/validator";


class ImageArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgObj: props.imgObj,
      eachData: props.eachData,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "product", "updateImage")) {
      if (typeof newProps.product.updateImage === "object") {
        const newEachData = JSON.parse(JSON.stringify(newProps.product.updateImage));
        this.setState({
          eachData: newEachData,
        });
      }
    }
  }

  render() {
    // console.log(this.props.eachData);
    const { imgObj, eachData } = this.state;
    const { postImage, collection } = this.props;
    let counter = 0;
    let currentSrc = "";
    return (
      <div>
        <Card>
          <CardBody>
            <Grid container>
              {imgObj.map((img, key) => {
                const imgTree = img.label.split("|");
                counter += 1;
                if (imgTree.length > 2) {
                  currentSrc = eachData[imgTree[2]][imgTree[1]][imgTree[0]];
                } else if (imgTree.length === 2) {
                  currentSrc = eachData[imgTree[1]][imgTree[0]];
                } else {
                  currentSrc = eachData[imgTree[0]];
                }
                return (
                  <GridItem xs={12} md={4} key={`${imgTree[0]}${counter}`}>
                    <ImagePlaceholder
                      srcImage={currentSrc}
                      label={img.label}
                      eachData={eachData}
                      fileInput={`${imgTree[0]}${eachData.id}`}
                      fullwidth={img.fullWidth}
                      width={img.width}
                      height={img.height}
                      postImage={postImage}
                      collection={collection}
                      arrayIma
                    />

                    <h4 style={{ fontWeight: "bolder", textAlign: "center" }}>
                      {img.imgType}
                    </h4>
                  </GridItem>
                );
              })}
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}


export default withStyles(cardImagesStyles)(ImageArray);
