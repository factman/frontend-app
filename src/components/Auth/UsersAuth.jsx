import React from "react";
import Link from "react-router-dom/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import LinkIcon from "@material-ui/icons/Link";
import Email from "@material-ui/icons/Email";
import VpnKey from "@material-ui/icons/VpnKey";
import Web3 from "web3";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CustomInput from "../CustomInput/CustomInput";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import BezopLogo from "../../assets/img/blue-favicon.svg";
import MetaMaskLogo from "../../assets/img/metamask.png";
import EmailLogo from "../../assets/img/email.png";
import { getIdFromToken, setUsersAccount, unsetUsersAccount } from "./AccessControl";
import { validateEmail, validateFullName } from "./DataValidation";

export const LS_KEY = "bezop-login:";
export const API_URL = (process.env.NODE_ENV === "development")
  ? process.env.REACT_APP_DEV_API_URL
  : process.env.REACT_APP_PROD_API_URL;

const web3 = new Web3();

const NO_METAMASK = "NO_METAMASK";
const NOT_SIGNED_UP = "NOT_SIGNED_UP";
const INACTIVE_METAMASK = "INACTIVE_METAMASK";
const ALREADY_SIGNED_UP = "ALREADY_SIGNED_UP";
const AUTH_FAILED = "AUTH_FAILED";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class UsersAuth extends React.Component {
  constructor(props) {
    super(props);
    this.auth = {
      customer: JSON.parse(localStorage.getItem(`${LS_KEY}customer`)),
      vendor: JSON.parse(localStorage.getItem(`${LS_KEY}vendor`)),
      admin: JSON.parse(localStorage.getItem(`${LS_KEY}admin`)),
    };
    this.state = {
      loading: false,
      verified: false,
      initial: true,
      modal: false,
      modalMessage: null,
      actionButton: null,
      footButton: null,
      withMetamask: true,
      altButton: null,
      form: {
        email: "",
        validEmail: true,
        password: "",
        validPassword: true,
      },
    };

    this.events = props.events;
    this.error = null;

    this.events.on("usersLogin", this.startLogin.bind(this));
    this.events.on("pageLogin", this.pageLogin.bind(this));
    this.events.on("usersSignUp", this.startSignUp.bind(this));
    this.events.on("pageSignUp", this.pageSignUp.bind(this));
    this.events.on("usersLogOut", this.userLogOut.bind(this));
  }

  getUserAddress = () => {
    if (!this.metaMaskInstalled()) {
      return false;
    }
    return this.metaMaskActive()
      .then((address) => {
        if (!address) {
          return false;
        }
        return address;
      });
  };

  getAltButton = (text, action, user) => {
    const { withMetamask } = this.state;
    return withMetamask
      ? (
        <Button
          color="primary"
          round
          simple
          onClick={() => {
            this.setState({ withMetamask: false }, () => action(user));
          }}
          style={{ fontWeight: "bold" }}
        >
          <img src={EmailLogo} alt="Email" height="30px" />
          &nbsp;
          {`${text} with Email`}
        </Button>)
      : (
        <Button
          color="warning"
          round
          simple
          onClick={() => {
            this.setState({ withMetamask: true }, () => action(user));
          }}
          style={{ fontWeight: "bold" }}
        >
          <img src={MetaMaskLogo} alt="Email" height="30px" />
          &nbsp;
          {`${text} with Metamask`}
        </Button>);
  };

  setValue = (event) => {
    const field = event.target.id;
    const { target } = event;
    const { form } = this.state;

    switch (field) {
      case "email":
        form.email = target.value.toLowerCase();
        form.validEmail = validateEmail(form.email);
        this.setState({ form });
        break;
      default:
        form.password = target.value;
        form.validPassword = validateFullName(form.password);
        this.setState({ form });
    }
  };

  validateForm = () => {
    const { form } = this.state;
    if ((form.validEmail === true) && (form.validPassword === true) && (form.email !== "") && (form.password !== "")) {
      return true;
    }
    return false;
  };

  startLogin = (user) => {
    const { withMetamask } = this.state;
    const actionButton = (
      <Button
        color="warning"
        size="lg"
        round
        onClick={() => this.usersLogin(user)}
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        {`Login as ${user}`}
      </Button>);

    const actionForm = (
      <Button
        type="button"
        size="md"
        color="primary"
        round
        onClick={() => this.emailLogin(user)}
        style={{ fontWeight: "bold" }}
      >
        {`Login as ${user}`}
      </Button>);

    this.setState({
      loading: false,
      verified: false,
      initial: true,
      modal: true,
      modalMessage: withMetamask ? "Login With METAMASK" : "Login With Email",
      actionButton: withMetamask ? actionButton : actionForm,
      footButton: null,
      altButton: this.getAltButton("Login", this.startLogin, user),
    });
  };

  pageLogin = (user) => {
    const { withMetamask } = this.state;
    const footButton = (
      <Button
        color="primary"
        size="lg"
        round
        simple
        onClick={() => this.pageSignUp(user)}
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        {`Sign Up as ${user}`}
      </Button>);

    const actionButton = (
      <Button
        color="warning"
        size="lg"
        round
        onClick={() => this.usersLogin(user)}
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        {`Login as ${user}`}
      </Button>);

    const actionForm = (
      <Button
        type="button"
        size="md"
        color="primary"
        round
        onClick={() => this.emailLogin(user)}
        style={{ fontWeight: "bold" }}
      >
        {`Login as ${user}`}
      </Button>);

    this.setState({
      loading: false,
      verified: false,
      initial: true,
      modal: true,
      modalMessage: withMetamask ? "Login With METAMASK" : "Login With Email",
      actionButton: withMetamask ? actionButton : actionForm,
      footButton,
      altButton: this.getAltButton("Login", this.pageLogin, user),
    });
  };

  pageSignUp = (user) => {
    const { withMetamask } = this.state;
    const footButton = (
      <Button
        color="primary"
        size="lg"
        round
        simple
        onClick={() => this.pageLogin(user)}
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        {`Login as ${user}`}
      </Button>);

    const actionButton = (
      <Button
        color="warning"
        size="lg"
        round
        onClick={() => this.usersSignUp(user)}
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        {`Sign Up as ${user}`}
      </Button>);

    const actionForm = (
      <Button
        type="button"
        size="md"
        color="primary"
        round
        onClick={() => this.emailSignUp(user)}
        style={{ fontWeight: "bold" }}
      >
        {`Sign Up as ${user}`}
      </Button>);

    this.setState({
      loading: false,
      verified: false,
      initial: true,
      modal: true,
      modalMessage: withMetamask ? "Sign Up With METAMASK" : "Sign Up With Email",
      actionButton: withMetamask ? actionButton : actionForm,
      footButton,
      altButton: this.getAltButton("Sign Up", this.pageSignUp, user),
    });
  };

  startSignUp = (user) => {
    const { withMetamask } = this.state;
    const actionButton = (
      <Button
        color="warning"
        size="lg"
        round
        onClick={() => this.usersSignUp(user)}
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        {`Sign Up as ${user}`}
      </Button>);

    const actionForm = (
      <Button
        type="button"
        size="md"
        color="primary"
        round
        onClick={() => this.emailSignUp(user)}
        style={{ fontWeight: "bold" }}
      >
        {`Sign Up as ${user}`}
      </Button>);

    this.setState({
      loading: false,
      verified: false,
      initial: true,
      modal: true,
      modalMessage: withMetamask ? "Sign Up With METAMASK" : "Sign Up With Email",
      actionButton: withMetamask ? actionButton : actionForm,
      footButton: null,
      altButton: this.getAltButton("Sign Up", this.startSignUp, user),
    });
  };

  loading = (action, message) => {
    const actionButton = (
      <Button
        size="lg"
        round
        style={{ fontWeight: "bold" }}
        disabled
      >
        <i className="fas fa-spinner fa-spin">
          &nbsp;
        </i>
        {action}
      </Button>);

    this.setState({
      loading: true,
      verified: false,
      initial: false,
      modal: true,
      modalMessage: message,
      actionButton,
      altButton: null,
    });
  };

verified = (action, message) => {
  const actionButton = (
    <Button
      size="lg"
      round
      style={{ fontWeight: "bold" }}
      disabled
    >
      <i className="fas fa-spinner fa-spin">
        &nbsp;
      </i>
      {action}
    </Button>);

  this.setState({
    loading: false,
    verified: true,
    initial: false,
    modal: true,
    modalMessage: message,
    actionButton,
    footButton: null,
    altButton: null,
  });
};

completed = (user, message) => {
  let url;
  let profile;
  switch (user) {
    case "customer":
      url = "/profile";
      profile = "Profile";
      break;
    case "vendor":
      url = "/dashboard";
      profile = "Dashboard";
      break;
    case "admin":
      url = "/admin";
      profile = "Control Panel";
      break;
    default:
  }

  const actionButton = (
    <Link to={url}>
      <Button
        size="lg"
        color="primary"
        round
        style={{ fontWeight: "bold" }}
        disabled={false}
      >
        <i className="fas fa-check">
&nbsp;
        </i>
        Visit your&nbsp;
        {profile}
      </Button>
    </Link>
  );

  this.setState({
    loading: false,
    verified: true,
    initial: false,
    modal: true,
    modalMessage: message,
    actionButton,
    footButton: null,
    altButton: null,
  });
};

metaMaskInstalled = () => {
  try {
    if (!Web3.givenProvider) {
      this.error = {
        message: "Please Install MetaMask on your browser before you can \"Login\" or \"Sign UP\".",
        type: NO_METAMASK,
        action: (
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            color="warning"
            size="lg"
            round="true"
            simple="true"
            style={{ fontWeight: "bold", color: "orange" }}
            disabled={false}
          >
            <i className="fas fa-external-link-alt">
              &nbsp;
            </i>
                Install METAMASK
          </a>),
      };
      return false;
    }
    web3.setProvider(Web3.givenProvider);
    return true;
  } catch (ex) {
    console.log(ex.message);
  }
  return null;
};

metaMaskActive = () => {
  try {
    return web3.eth.getCoinbase()
      .then((address) => {
        if (!address) {
          this.error = {
            message: "Please \"Login or Activate\" your MetaMask extension on your Browser before you can \"Login\" or \"Sign Up\".",
            type: INACTIVE_METAMASK,
            action: null,
          };
          return false;
        }
        return address;
      });
  } catch (ex) {
    console.log(ex.message);
  }
  return null;
};

emailSignUp = (user) => {
  const authType = "signup";
  const userType = user;
  const { form } = this.state;

  if (!this.validateForm()) {
    console.log("Form Error!");
  } else {
    const { email, password } = form;

    this.loading(" Please wait...", "Loading please wait...");

    fetch(`${API_URL}/authenticate/email/${userType.toLowerCase()}/${authType}/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.success && Object.keys(responseJSON.data).length > 0) {
          responseJSON.user = user;
          console.log(responseJSON);
          return (responseJSON);
        }
        this.error = {
          message: "You've Signed Up already, Login Now.",
          type: ALREADY_SIGNED_UP,
          action: (
            <Button
              type="button"
              size="md"
              color="primary"
              round
              onClick={() => this.emailLogin(user)}
              style={{ fontWeight: "bold" }}
            >
              {`Login as ${user}`}
            </Button>),
        };
        throw Error("warning");
      })
      .then(this.userLogIn)
      .catch((err) => {
        if (err.message !== "warning") {
          this.handleErrors(err.message);
        } else {
          this.handleErrors(this.error);
        }
      });
  }
};

usersSignUp = (user) => {
  const authType = "signup";
  const userType = user;

  this.getUserAddress()
    .then((userAddress) => {
      if (!userAddress) {
        this.handleErrors(this.error);
      } else {
        userAddress = userAddress.toLowerCase();

        this.loading(" Please wait...", "Loading please wait...");

        // 1a. Look if user with current publicAddress has already signed up.
        fetch(`${API_URL}/authenticate/metamask/${userType.toLowerCase()}/${authType}/publicaddress/${userAddress}/?key=${process.env.REACT_APP_API_KEY}`)
          .then(response => response.json())

        // 1b. If yes, retrieve { publicAddress, nonce, authType } from responseJSON.data
          .then((responseJSON) => {
            if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
              responseJSON.user = user;
              return (responseJSON);
            }
            this.error = {
              message: "You've Signed Up already, Login Now.",
              type: ALREADY_SIGNED_UP,
              action: (
                <Button
                  color="warning"
                  size="lg"
                  round
                  onClick={() => this.usersLogin(user)}
                  style={{ fontWeight: "bold" }}
                  disabled={false}
                >
                  Login as
                  {" "}
                  {user}
                </Button>),
            };
            throw Error("warning");
          })

        // 2. Popup MetaMask confirmation modal to sign message
          .then(this.userSignMessage)

        // 3. Send signature to backend on the /auth route
          .then(this.userAuthenticate)

        // 4. Pass accessToken back to parent component (to save it in localStorage)
          .then(this.userLogIn)

          .catch((err) => {
            if (err.message !== "warning") {
              this.handleErrors(err.message);
            } else {
              this.handleErrors(this.error);
            }
          });
      }
    });
};

emailLogin = (user) => {
  const authType = "login";
  const userType = user;
  const { form } = this.state;

  if (!this.validateForm()) {
    console.log("Form Error!");
  } else {
    const { email, password } = form;

    this.loading(" Please wait...", "Loading please wait...");

    fetch(`${API_URL}/authenticate/email/${userType.toLowerCase()}/${authType}/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.success && Object.keys(responseJSON.data).length > 0) {
          responseJSON.user = user;
          console.log(responseJSON);
          return (responseJSON);
        }
        this.error = {
          message: (
            <span style={{ color: "red", fontSize: "0.8em" }}>
              Invalid Email or Password!
            </span>),
          type: NOT_SIGNED_UP,
          action: (
            <Button
              type="button"
              size="md"
              color="primary"
              round
              onClick={() => this.emailLogin(user)}
              style={{ fontWeight: "bold" }}
            >
              {`Login as ${user}`}
            </Button>),
        };
        throw Error("warning");
      })
      .then(this.userLogIn)
      .catch((err) => {
        if (err.message !== "warning") {
          this.handleErrors(err.message);
        } else {
          this.handleErrors(this.error);
        }
      });
  }
};

usersLogin = (user) => {
  const authType = "login";
  const userType = user;

  this.getUserAddress()
    .then((userAddress) => {
      console.log(userAddress);
      if (!userAddress) {
        this.handleErrors(this.error);
      } else {
        userAddress = userAddress.toLowerCase();

        this.loading(" Please wait...", "Loading please wait...");

        // 1a. Look if user with current publicAddress has already signed up.
        fetch(`${API_URL}/authenticate/metamask/${userType.toLowerCase()}/${authType}/publicaddress/${userAddress}/?key=${process.env.REACT_APP_API_KEY}`)
          .then(response => response.json())

        // 1b. If yes, retrieve { publicAddress, nonce, authType } from responseJSON.data
          .then((responseJSON) => {
            if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
              responseJSON.user = user;
              console.log(responseJSON);
              return (responseJSON);
            }
            this.error = {
              message: "Please Sign Up before you can Login.",
              type: NOT_SIGNED_UP,
              action: (
                <Button
                  color="warning"
                  size="lg"
                  round
                  onClick={() => this.usersSignUp(user)}
                  style={{ fontWeight: "bold" }}
                  disabled={false}
                >
                  Sign Up as
                  {" "}
                  {user}
                </Button>),
            };

            throw Error("warning");
          })

        // 2. Popup MetaMask confirmation modal to sign message
          .then(this.userSignMessage)

        // 3. Send signature to backend on the /auth route
          .then(this.userAuthenticate)

        // 4. Pass accessToken back to parent component (to save it in localStorage)
          .then(this.userLogIn)

          .catch((err) => {
            if (err.message !== "warning") {
              this.handleErrors(err.message);
            } else {
              this.handleErrors(this.error);
            }
          });
      }
    });
};

handleErrors = (err) => {
  switch (err.type) {
    case NO_METAMASK:
    case INACTIVE_METAMASK:
    case NOT_SIGNED_UP:
    case ALREADY_SIGNED_UP:
      this.setState({
        loading: false,
        verified: false,
        initial: true,
        modal: true,
        modalMessage: err.message,
        actionButton: err.action,
      });
      break;
    case AUTH_FAILED:
    default:
      this.setState({
        loading: false,
        verified: false,
        initial: true,
        modal: true,
        modalMessage: err,
        actionButton: null,
      });
  }
};

    userAuthenticate = ({ publicAddress, signature, authType, user }) => fetch(`${API_URL}/authenticate/metamask/${user.toLowerCase()}/auth/${authType}/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.success && Object.keys(responseJSON.data).length === 1) {
          responseJSON.user = user.toLowerCase();
          return responseJSON;
        }
        throw new Error(`Authentication Failed: ${(responseJSON.message) ? responseJSON.message : responseJSON.error.message}`);
      });

    userSignMessage = ({ data, user }) => {
      const { publicAddress, nonce, authType } = data;
      this.loading(" Please wait...", "Waiting for MetaMask Signature.");
      return new Promise((resolve, reject) => web3.eth.personal.sign(
        web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce} to ${authType}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          this.verified("Authenticating...", "Signature Confirmed.");
          return resolve({ publicAddress, signature, authType, user });
        },
      ));
    };

    userLogIn = ({ data, user }) => {
      const { accessToken } = data;
      const id = getIdFromToken(accessToken);
      return setUsersAccount({ user, id, accessToken })
        .then(() => {
          this.completed(user, "You're now logged in.\r\nRedirecting...");
          switch (user) {
            case "customer":
              window.location.reload();
              break;
            case "vendor":
              window.location.href = "/dashboard";
              break;
            case "admin":
              window.location.href = "/admin";
              break;
            default:
          }
        });
    };

    userLogOut = (user) => {
      unsetUsersAccount(user);
      window.location.href = "/";
    };

    handleClose = () => {
      this.setState({
        loading: false,
        verified: false,
        initial: true,
        modal: false,
        modalMessage: null,
        actionButton: null,
        altButton: null,
        form: {
          email: "",
          validEmail: true,
          password: "",
          validPassword: true,
        },
      });
    };

    render() {
      const { classes } = this.props;
      const {
        modal,
        loading,
        verified,
        modalMessage,
        actionButton,
        initial,
        footButton,
        altButton,
        withMetamask,
        form,
      } = this.state;

      const userEquals = (arr) => {
        const cUser = window.location.pathname.split("/")[2];
        let output = false;
        arr.map((item) => {
          if (item === cUser) {
            output = true;
          }
          return item;
        });
        return output;
      };

      const ModalContentMetamask = (
        <div>
          <h2 style={{ textAlign: "center", marginTop: "0px" }}>
            <img src={BezopLogo} alt="Logo" style={{ marginBottom: "0px", height: "80px" }} />
            <LinkIcon style={{ fontSize: "1.5em", margin: "auto 20px", marginBottom: "-20px" }} />
            <img src={MetaMaskLogo} alt="Logo" style={{ marginBottom: "0px", height: "50px" }} />
            <br />
            {(loading)
              ? (
                <span className="fa-stack fa-1x">
                  <i className="fas fa-spinner fa-spin fa-stack-2x" />
                  <i className="fas fa-user fa-stack-1x" />
                </span>
              )
              : null
                }
            {(initial)
              ? <i className="fas fa-user" />
              : null
                }
            {(verified)
              ? (
                <span className="fa-stack fa-1x">
                  <VerifiedUser style={{ fontSize: "2em" }} />
                </span>
              )
              : null
                }
          </h2>
          <h4 style={{ textAlign: "center" }}>
            {modalMessage}
          </h4>
          <h3 style={{ textAlign: "center" }}>
            {actionButton}
          </h3>
          {altButton !== null
            ? (
              <div style={{ display: userEquals(["admin", "vendor"]) ? "none" : "block" }}>
                <hr style={{ marginTop: "20px", marginBottom: "0px", borderStyle: "solid", borderColor: "lightgray" }} />
                <div style={
                  {
                    width: "40px",
                    height: "40px",
                    border: "1px solid lightgray",
                    textAlign: "center",
                    borderRadius: "40px",
                    margin: "-20px auto 20px auto",
                    lineHeight: "40px",
                    backgroundColor: "white",
                  }}
                >
                  OR
                </div>
                <h3 style={{ textAlign: "center", margin: "-15px auto" }}>
                  {altButton}
                </h3>
              </div>)
            : null}
        </div>
      );

      const ModalContentEmail = (
        <div>
          <h2 style={{ textAlign: "center", marginTop: "0px" }}>
            <img src={BezopLogo} alt="Logo" style={{ marginBottom: "0px", height: "80px" }} />
            <LinkIcon style={{ fontSize: "1.5em", margin: "auto 20px", marginBottom: "-20px" }} />
            <img src={EmailLogo} alt="Logo" style={{ marginBottom: "0px", height: "50px" }} />
            <br />
            {(loading)
              ? (
                <span className="fa-stack fa-1x">
                  <i className="fas fa-spinner fa-spin fa-stack-2x" />
                  <i className="fas fa-user fa-stack-1x" />
                </span>
              )
              : null
                }
            {(initial)
              ? <i className="fas fa-user" />
              : null
                }
            {(verified)
              ? (
                <span className="fa-stack fa-1x">
                  <VerifiedUser style={{ fontSize: "2em" }} />
                </span>
              )
              : null
                }
          </h2>
          <h4 style={{ textAlign: "center" }}>
            {modalMessage}
          </h4>
          <h3 style={{ textAlign: "center" }}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={8}>
                <CustomInput
                  labelText="Email Address"
                  id="email"
                  color="primary"
                  error={!form.validEmail}
                  formControlProps={{
                    fullWidth: true,
                    style: { marginTop: "-20px" },
                    onChange: event => this.setValue(event),
                    required: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email />
                      </InputAdornment>),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={8}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  color="primary"
                  error={!form.validPassword}
                  formControlProps={{
                    fullWidth: true,
                    style: { marginTop: "-20px" },
                    onChange: event => this.setValue(event),
                    required: true,
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <VpnKey />
                      </InputAdornment>),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={8}>
                {actionButton}
              </GridItem>
            </GridContainer>
          </h3>
          {altButton !== null
            ? (
              <div>
                <hr style={{ marginTop: "20px", marginBottom: "0px", borderStyle: "solid", borderColor: "lightgray" }} />
                <div style={
                  {
                    width: "40px",
                    height: "40px",
                    border: "1px solid lightgray",
                    textAlign: "center",
                    borderRadius: "40px",
                    margin: "-20px auto 20px auto",
                    lineHeight: "40px",
                    backgroundColor: "white",
                  }}
                >
                  OR
                </div>
                <h3 style={{ textAlign: "center", margin: "-15px auto" }}>
                  {altButton}
                </h3>
              </div>)
            : null}
        </div>
      );

      return (
        <span>
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            open={modal}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
            disableBackdropClick
            disableEscapeKeyDown
            scroll="body"
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
              style={{ minWidth: "400px", borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
            >
              <h3 style={{ textAlign: "center", margin: "0px" }}>
                Bezop Marketplace
              </h3>
            </DialogTitle>
            <DialogContent
              id="modal-slide-description"
              className={classes.modalBody}
              style={{ maxWidth: "600px" }}
            >
              {withMetamask ? ModalContentMetamask : ModalContentEmail}
            </DialogContent>
            <DialogActions
              className={`${classes.modalFooter} ${classes.modalFooterCenter}`}
            >
              {(footButton) || (
              <Button onClick={() => this.handleClose()}>
                Close
              </Button>
              )
                    }
            </DialogActions>
          </Dialog>
        </span>
      );
    }
}

export default withStyles(modalStyle)(UsersAuth);
