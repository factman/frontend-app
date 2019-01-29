import React from "react";
import Carousel from "react-slick";

import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Parallax from "./Parallax";
import Validator from "../../helpers/validator";
import defaultSlider from "../../assets/img/default-slider.jpg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, slides, images } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    let content = null;

    if (!images) {
      const slide = slides.filter(slider => slider.page.product);
      const elements = slide.map(slider => Object.values(slider.elements)
        .filter(element => Validator.propertyExist(element, "image")));
      const sliders = [];
      elements.map((element) => {
        if (element.length > 0) {
          element.map(contents => sliders.push(contents));
        }
        return null;
      });

      if (sliders && sliders.length !== 0) {
        content = sliders.map(element => (
          <Parallax filter className="slick-image" image={element.image} key={element.image}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem>
                  <div style={{ textAlign: "center", color: "#ffffff" }}>
                    <h1 className={classes.title}>
                      {element.title}
                    </h1>
                    <h3>
                      {element.subtitle}
                    </h3>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>));
      } else {
        content = (<Parallax filter className="slick-image" image={defaultSlider} />);
      }
    } else {
      content = images.map(image => (<Parallax filter className="slick-image" image={image} key={image} />));
    }

    return (
      <div style={{ height: "400px", overflow: "hidden" }}>
        <Carousel {...settings}>
          {content}
        </Carousel>
      </div>
    );
  }
}

export default Slider;
