import React from "react";
// core components
import Events from "events";
import Footer from "../../components/Footer/Footer";
import image from "../../assets/img/img3.jpg";
import UsersAuth from "../../components/Auth/UsersAuth";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import Header from "../../components/Header/Header";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.user = props.match.url.replace("/login/", "").replace("/", "");

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.events = new Events();
  }

  componentDidMount() {
    this.events.emit("pageLogin", this.user);
  }

  render() {
    document.title = `${this.user} Login @ Bezop Marketplace || Worlds First Decentralized Marketplace`;
    return (
      <div>
        <Header
          brand=""
          leftLinks={<LandingPageLinks user={this.user} />}
          rightLinks={<LandingPageMobile user={this.user} />}
          color="white"
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <UsersAuth events={this.events} />
          <div style={{ position: "fixed", bottom: "1%", zIndex: "10000", width: "100%" }}>

            <Footer whiteFont />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
