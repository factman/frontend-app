import { title, container, warningColor, secondaryBackground } from "../../../material-kit-react";

const productStyle = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
  },
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
  paddinglessSection: {
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  description: {
    color: "#999",
  },
  marginDynamic: {
    margin: "0 10%",
    [theme.breakpoints.down("sm")]: {
      margin: "0 5%",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 1%",
    },
  },
  labelFontSmall: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.654rem",
    },
    color: "white",
  },
  tabSelected: {
    color: `${warningColor} !important`,
  },
  selectedButton: {
    backgroundColor: `${warningColor} !important`,
  },
  marginSpacer: {
    marginBottom: "10px",
    padding: "15px",
  },
  colorPrimaryCustom: {
    color: "#46b6f6 !important",
    textDecoration: "underline",
    fontWeight: "bolder",
  },
  colorSecondaryCustom: {
    color: "green !important",
  },
  dynamicMarginTopSpec: {
    marginTop: "215px",
    position: "fixed",
    width: "25%",
    top: "0",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  currentHeight: {
    height: "calc(100% - 100px)",
  },
  fullHeight: {
    height: "100%",
  },
  tabsRoot: {
    // borderBottom: "1px solid #e8e8e8",
  },
  tabsIndicator: {
    ...secondaryBackground,
    // backgroundColor: "#1890ff",
  },
  specialSearch: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 45,
      paddingRight: 75,
    },
  },
  cssUnderline: {
    "&:after,&:hover,&:before": {
      borderBottomColor: "transparent !important",
    },
  },
  inputSearch: {
    padding: "5px 15px",
    paddingRight: 0,
    fontSize: "1rem",
    border: "1px solid #cccccc",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16)",
    backgroundColor: "#ffffff",
    "&:hover,&:active,&:focus": {
      boxShadow: "0px 2px 7px rgba(155, 155, 155, 0.7)",
    },
    "&:after,&:hover,&:before": {
      borderBottom: "none",
    },
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: "72px !important",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif",
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'",
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$tabSelected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  buttonWrapperAlign: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
  },
  containerMaxWidth: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
});

export default productStyle;
