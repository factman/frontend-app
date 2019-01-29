// @desc This is the Admin's Landing Page after sign-in;
// It contains the header, the sidebar and the footer
// @author Sylvia Onwukwe

/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import AdminHeader from "../../components/Header/AdminHeader";
import Header from "../../components/Header/Admin";
import Footer from "../../components/Footer/Footer";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";

import adminRoutes from "../../routes/admin";

import dashboardStyle from "../../assets/jss/material-kit-react/layouts/dashboardStyle";

import image from "../../assets/img/profile-bg.jpg";
import logo from "../../assets/img/white-favicon.png";
import MobileSidebar from "../../components/Sidebar/MobileSidebar";


const switchRoutes = (
  <Switch>
    {adminRoutes.map((prop, key) => {
       if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;
       if(prop.hasOwnProperty("subMenu")){
         return prop.subMenu.map((submenu, subkey) => {
           if(submenu.hasOwnProperty("exact")){
             return <Route exact path={submenu.path} component={submenu.component} key={`${key}.${subkey}`} />
           } else {
             return <Route path={submenu.path} component={submenu.component} key={`${key}.${subkey}`} />;
           }
         }
       )
       }else if(prop.hasOwnProperty("exact")){
         return <Route exact path={prop.path} component={prop.component} key={key} />
       } else {
         return <Route path={prop.path} component={prop.component} key={key} />;
       }
       
     })}
  </Switch>
);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobileOpen: false
    };
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if(this.state.mobileOpen){
        this.setState({mobileOpen: false});
      }
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const sideMenu = <AdminSidebar
      routes={adminRoutes}
      logoText="Bezop&nbsp;Store"
      logo={logo}
      image={image}
      handleDrawerToggle={this.handleDrawerToggle}
      open={this.state.mobileOpen}
      color="blue"
      {...rest}
    />;
    const mobileSidebar = <MobileSidebar
      routes={adminRoutes}
      logoText="Bezop&nbsp;Store"
      logo={logo}
      image={image}
      handleDrawerToggle={this.handleDrawerToggle}
      open={this.state.mobileOpen}
      color="blue"
      {...rest}
    />;

    return (
      <div className={classes.wrapper}>
        {sideMenu}
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            brand=""
            leftLinks={<AdminHeader />}
            rightLinks={mobileSidebar}
            color="white"
            routes={adminRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
