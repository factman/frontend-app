import React from "react";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import ProfileCard from "./Sections/ProfileCard";
// import SubscribeCard from "./Sections/SubscribeCard";
import Overview from "./Sections/Overview";
import Profile from "./Sections/Profile";
import Notifications from "./Sections/Notifications";
import Orders from "./Sections/Orders";
import Wishlist from "./Sections/Wishlist";
import Tickets from "./Sections/Tickets";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import { getUserProfile } from "../../components/Auth/AccessControl";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: true,
      profile: false,
      notifications: false,
      orders: false,
      wishlist: false,
      ticket: false,
      loader: "block",
    };
    this.goto = this.goto.bind(this);
  }

  componentDidMount() {
    try {
      const { location } = this.props;
      const nav = ["overview", "profile", "notifications", "orders", "wishlist", "ticket"];
      const paths = location.pathname.split("/");
      this.setState({ loader: "none" });
      if (paths.length > 2 && paths[2] !== "" && nav.includes(paths[2])) {
        this.goto(paths[2]);
      } else {
        this.goto("overview");
      }
    } catch (ex) {
      console.log(ex.message);
    }
  }

  goto = (page) => {
    try {
      const nav = {
        overview: false,
        profile: false,
        notifications: false,
        orders: false,
        wishlist: false,
        ticket: false,
      };
      nav[page] = true;
      this.setState(nav);
    } catch (ex) {
      console.log(ex.message);
    }
  };

  render() {
    const { classes, location, ...rest } = this.props;
    const { loader, overview, profile, notifications, orders, wishlist, ticket } = this.state;
    const profileData = getUserProfile("customer");
    console.log(profileData);

    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand=""
          leftLinks={<LandingPageLinks user="customer" />}
          rightLinks={<LandingPageMobile user="customer" />}
          color="white"
          {...rest}
        />

        <GridContainer className={classes.container} spacing={16}>
          <GridItem xs={12}>
            <GridContainer justify="center" spacing={40}>
              <GridItem lg={3} md={4} xs={12}>
                <GridContainer justify="center" spacing={40}>
                  <GridItem lg={12}>
                    <ProfileCard
                      profileData={profileData}
                      state={this.state}
                      classes={classes}
                      goto={this.goto}
                    />
                  </GridItem>
                  <GridItem lg={12}>
                    {/* <SubscribeCard classes={classes} /> */}
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem lg={9} md={8} xs={12}>
                {(overview)
                  ? <Overview classes={classes} profile={profileData} />
                  : null}
                {(profile)
                  ? <Profile classes={classes} profile={profileData} />
                  : null}
                {(notifications)
                  ? <Notifications classes={classes} profile={profileData} />
                  : null}
                {(orders)
                  ? <Orders classes={classes} profile={profileData} />
                  : null}
                {(wishlist)
                  ? <Wishlist classes={classes} profile={profileData} />
                  : null}
                {(ticket)
                  ? <Tickets classes={classes} profile={profileData} />
                  : null}
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>

        <Footer />
      </div>
    );
  }
}

export default (ProfilePage);
