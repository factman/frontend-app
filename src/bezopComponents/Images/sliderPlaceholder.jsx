import React from "react";
import { Grid } from "../../../node_modules/@material-ui/core";
import SliderImage from "./sliderImage";
import GridItem from "../../components/Grid/GridItem";
import Validator from "../../helpers/validator";

class SliderPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    const { elements } = this.props;
    this.state = {
      elements,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "slider", "updateImage")) {
      if (typeof newProps.slider.updateImage === "string") {
        return false;
      }
      this.setState({
        elements: Object.values(newProps.slider.updateImage.elements),
      });
    }
    return false;
  }

  render() {
    const { elements } = this.state;
    const { collection, eachData, postImage, slider, height, width } = this.props;
    let counter = 0;
    return (
      <Grid container>
        {elements.map((element, index) => {
          const elem = (
            <GridItem xs={12} sm={12} md={3} key={`${eachData.id}${counter}`}>
              <SliderImage
                srcImage={element.image}
                collection={collection}
                postImage={postImage}
                slider={slider}
                label={`image|element${index}|elements`}
                title={element.title}
                fileInput={`elements${index}${eachData.id}`}
                subtitle={element.subtitle}
                eachData={eachData}
                height={height}
                width={width}
              />
            </GridItem>
          );
          counter += 1;
          return elem;
        })}
      </Grid>
    );
  }
}

export default SliderPlaceholder;
