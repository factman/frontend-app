import { container, title } from "../../material-kit-react";

const landingPageStyle = theme => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  centerAlign: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  inputSearch: {
    padding: "20px",
    fontSize: "20px",
    margin: "15px",
    borderRadius: "5px",
  },
  constainerMaxWidth: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "1140px",
      margin: "auto",
    },
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  tabSelected: {
    color: "red",
  },
  cssUnderline: {
    "&:after,&:hover,&:before": {
      borderBottomColor: "transparent !important",
    },
  },
});

export default landingPageStyle;
