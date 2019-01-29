import React from "react";
import Redirect from "react-router-dom/Redirect";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
// Sections for this page
import Header from "../../components/Header/Header";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import VideoModal from "../../bezopComponents/Modal/videoModal";
import searchLogo from "../../assets/img/white-logo.png";
import HomeBg from "../../assets/img/HOME BG.jpg";
import CustomInput from "../../components/CustomInput/CustomInput";
import { secondaryBackground } from "../../assets/jss/material-kit-react";
import Collections from "./Sections/Collections";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      submitted: false,
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  onEnterKey = (e) => {
    if (e.key === "Enter") {
      const { search } = this.state;
      if (search !== "") {
        this.onSubmit();
      }
    }
  }

  onSubmit = () => {
    const { search } = this.state;
    if (search !== "") {
      // window.location.href = `/search?q=${encodeURI(search)}`;
      this.setState({ submitted: true });
    }
  }

  render() {
    const { classes, location, ...rest } = this.props;
    const { search, submitted } = this.state;
    const slideContents = ["Baby", "Beauty", "Games", "Fitness", "Phone", "Sports", "Tools", "Toys"];
    if (submitted) return (<Redirect to={`/search?q=${encodeURI(search)}`} from="/" />);
    return (
      <div style={{
        backgroundImage: `url("${HomeBg}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      >
        <Header
          color="transparent"
          brand=""
          leftLinks={<LandingPageLinks user="customer" />}
          rightLinks={<LandingPageMobile user="customer" />}
          {...rest}
        />
        <div style={{
          height: "80.5vh",
          backgroundColor: "transparent",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          <GridContainer className={classes.constainerMaxWidth} style={{ width: "100%" }}>
            <GridItem xs={12} sm={12} md={12} className={classes.centerAlign}>
              <VideoModal>
                <img
                  src={searchLogo}
                  alt="search-logo"
                  style={{
                    height: "70px",
                    display: "flex",
                    margin: "5px auto",
                  }}
                />
              </VideoModal>
              <div>
                {/* <input
                  id="regular"
                  placeholder="Search for any products or store"
                  type="search"
                  value={search}
                  onChange={this.onChangeHandler}
                  onKeyPress={this.onEnterKey}
                  style={{
                    backgroundColor: "rgb(249, 249, 249)",
                    border: "0px",
                    padding: "15px 20px",
                    position: "relative",
                    display: "flex",
                    margin: "20px auto",
                    width: "70%",
                    borderRadius: "5px",
                    fontSize: "0.9em",
                    boxShadow: "0px 1px 5px rgba(0,0,0,0.2)",
                  }}
                /> */}
                <CustomInput
                  id="regular"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    placeholder: "Search for any products or store",
                    type: "search",
                    value: search,
                    onChange: this.onChangeHandler,
                    onKeyPress: this.onEnterKey,
                    classes: {
                      underline: classes.cssUnderline,
                    },
                    style: {
                      backgroundColor: "rgb(249, 249, 249)",
                      // border: `2px solid ${primaryColor}`,
                      padding: "15px 20px 10px",
                      position: "relative",
                      display: "flex",
                      margin: "20px auto",
                      width: "70%",
                      borderRadius: "100px",
                      fontSize: "1em",
                      boxShadow: "0px 1px 5px rgba(0,0,0,0.2)",
                      overflow: "hidden",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon
                          style={{
                            ...secondaryBackground,
                            color: "white",
                            padding: "28px 50px 35px 20px",
                            margin: "-30px -24px -12px 0px",
                            zIndex: "10",
                            cursor: "pointer",
                          }}
                          onClick={search.length === 0 ? null : this.onSubmit}
                        />
                      </InputAdornment>),
                  }}
                />
                <Button
                  size="md"
                  color="warning"
                  round
                  onClick={this.onSubmit}
                  disabled={search.length === 0}
                >
                  <SearchIcon />
                  Bezop Search
                </Button>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.centerAlign}>
              <Collections data={slideContents} />
            </GridItem>
          </GridContainer>
        </div>
        <Footer transparent />
      </div>
    );
  }
}

export default LandingPage;
