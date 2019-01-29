import React from "react";
import LoadingScreen from "react-loading-screen";
import loaderImage from "../../assets/img/blue-favicon.svg";

export class PageLoader extends React.Component {
  state = {};

  render() {
    const { display, min } = this.props;
    const style = {
      loaderStyle: {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "10001",
        backgroundImage: `url("${loaderImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display,
      },
      loaderBg: {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "10000",
        backgroundColor: "#ffffff",
        opacity: ".98",
        display,
      },
    };

    const loadingState = (display === "block") ? true : false;

    if (min) {
      return (
        <LoadingScreen
          style={style.loaderBg}
          loading={loadingState}
          bgColor="rgba(255, 255, 255, 0)"
          spinnerColor="#1479fb"
        >
          <span />
          {/* <div className="fa-spin" style={style.loaderStyle} /> */}
        </LoadingScreen>
      );
    }
    return (
      <LoadingScreen
        style={style.loaderBg}
        loading={loadingState}
        bgColor="rgba(255, 255, 255, .98)"
        spinnerColor="#1479fb"
      >
        <span />
        {/* <div className="fa-spin" style={style.loaderStyle} /> */}
      </LoadingScreen>
    );
  }
}
