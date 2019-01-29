import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";

import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";

import cardImagesStyles from "../../assets/jss/material-kit-react/cardImagesStyles";
import ProductImagePlaceholder from "./productImagePlaceholder";
import Validator from "../../helpers/validator";

class ImagePanel extends React.Component {
  constructor(props) {
    super(props);
    const { imgObj, eachData } = this.props;
    this.state = {
      imgObj,
      eachD: eachData,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "product", "updateImage")) {
      if (typeof newProps.product.updateImage === "string") {
        return false;
      }
      const newEachData = JSON.parse(JSON.stringify(newProps.product.updateImage));
      this.setState({
        eachD: newEachData,
      });
    }
    return false;
  }

  render() {
    const { imgObj, eachD } = this.state;
    const { postImage, collection, product, eachData } = this.props;
    let counter = 0;
    return (
      <div>
        <Card>
          <CardBody>
            <Grid container>
              {imgObj.map((img, index) => {
                const imgTree = img.label.split("|");
                let imgSrc;
                switch (imgTree.length) {
                  case 3:
                    imgSrc = eachD[imgTree[2]][imgTree[1]][imgTree[0]];
                    break;
                  case 2:
                    imgSrc = eachD[imgTree[1]][imgTree[0]];
                    break;
                  case 1:
                    imgSrc = eachD[imgTree[2]][imgTree[1]][imgTree[0]];
                    break;
                  default:
                    return false;
                }
                const elem = (
                  <GridItem xs={12} md={4} key={`${eachD.id}${counter}`}>
                    <ProductImagePlaceholder
                      srcImage={imgSrc}
                      label={img.label}
                      eachData={eachData}
                      fileInput={`${imgTree[0]}${index}${eachData.id}`}
                      fullwidth={img.fullWidth}
                      width={img.width}
                      height={img.height}
                      postImage={postImage}
                      collection={collection}
                      product={product}
                      aspect
                    />
                    <h4 style={{ fontWeight: "bolder", textAlign: "center" }}>
                      {img.imgType}
                    </h4>
                  </GridItem>
                );
                counter += 1;
                return elem;
              })}
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(cardImagesStyles)(ImagePanel);
