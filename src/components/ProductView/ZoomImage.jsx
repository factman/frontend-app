import React from "react";
import ReactImageMagnify from "react-image-magnify";

class ZoomImage extends React.Component {
  state = {};

  render() {
    const { alt, src, className } = this.props;
    return (
      <ReactImageMagnify {...{
        smallImage: {
          alt,
          isFluidWidth: true,
          src,
          className,
        },
        largeImage: {
          src,
          width: 1500,
          height: 1500,
        },
        enlargedImagePosition: "over",
      }}
      />
    );
  }
}

export default ZoomImage;
