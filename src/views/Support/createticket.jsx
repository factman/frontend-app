import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Note from "@material-ui/icons/Note";
import Snackbar from "@material-ui/core/Snackbar";
import isEqual from "lodash/isEqual";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CustomInput from "../../components/CustomInput/CustomInput";
import TicketTrend from "./ticketTrend";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
import Validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

class CreateTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportTicketMessage: {
        messageBetween: "customer_vendor",
        customer: Validator.propertyExist(props.eachData, "customer") ? props.eachData.customer : "",
        kind: "ticket",
        messageSession: Validator.propertyExist(props.eachData, "id") ? props.eachData.id : "",
        subject: Validator.propertyExist(props.eachData, "subject") ? props.eachData.subject : "",
        message: "",
      },
      messages: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
      variantSnackBar: "success",
    };
  }

  componentDidMount() {
    // when component mount
    const {
      fetchTicketMessages,
    } = this.props;
    const {
      supportTicketMessage,
    } = this.state;

    if (fetchTicketMessages) {
      fetchTicketMessages(supportTicketMessage.messageSession);
    }
  }

  componentWillReceiveProps(newProps) {
    const { ticket } = this.props;
    if (
      Validator.propertyExist(newProps, "ticket", "getTicketMessages")
    && isEqual(newProps.ticket.getTicketMessages, ticket.getTicketMessages) === false
    ) {
      if (typeof newProps.ticket.getTicketMessages === "object") {
        this.setState({
          messages: Array.isArray(newProps.ticket.getTicketMessages)
            ? newProps.ticket.getTicketMessages : [newProps.ticket.getTicketMessages],
        });
      }
    }

    if (
      Validator.propertyExist(newProps, "ticket", "postTicketMessage")
    && isEqual(newProps.ticket.postTicketMessage, ticket.postTicketMessage) === false
    ) {
      if (typeof newProps.ticket.postTicketMessage === "string") {
        this.setState({
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: newProps.ticket.postTicketMessage,
          variantSnackBar: "error",
        });
        return false;
      }
      const { messages } = this.state;
      this.setTicketMessageDetails("message");
      this.setState({
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created ticket",
        variantSnackBar: "success",
        messages: messages.concat([newProps.ticket.postTicketMessage]),
      });
    }
    return false;
  }

  handleChange = (e) => {
    this.setTicketMessageDetails(e.target.name, e.target.value);
  }

  setTicketMessageDetails = (name, value = "") => {
    const { supportTicketMessage } = this.state;
    const newSupportTicketMessage = JSON.parse(JSON.stringify(supportTicketMessage));
    newSupportTicketMessage[name] = value;
    this.setState({
      supportTicketMessage: newSupportTicketMessage,
    });
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  submitTicket = () => {
    const { supportTicketMessage } = this.state;
    const { postTicketMessage } = this.props;

    if (
      postTicketMessage
      && supportTicketMessage.message.length >= 2
    ) {
      postTicketMessage(supportTicketMessage);
    }
  }

  render() {
    const {
      messages,
      supportTicketMessage,
      snackBarOpenSuccess,
      snackBarMessageSuccess,
      variantSnackBar,
    } = this.state;
    console.log(messages);
    return (
      <div>
        <GridContainer justify="center">
          <GridItem>
            <Card>
              <CardHeader color="primary">
                <h4>
                  Support Ticket
                </h4>
                <p>
                  Create A New Support Ticket
                </p>
              </CardHeader>
              <CardBody>
                <TicketTrend
                  messages={messages}
                />
                <CustomInput
                  labelText="Message Content"
                  id="content"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 3,
                    name: "message",
                    value: supportTicketMessage.message,
                    onChange: this.handleChange,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Note />
                      </InputAdornment>
                    ),
                  }}
                />
              </CardBody>
              <CardFooter style={{ justifyContent: "flex-end" }}>
                <Button
                  color="primary"
                  onClick={this.submitTicket}
                >
                  Send
                </Button>
              </CardFooter>
            </Card>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={snackBarOpenSuccess}
              onClose={this.onCloseHandlerSuccess}
            >
              <BezopSnackBar
                onClose={this.onCloseHandlerSuccess}
                variant={variantSnackBar}
                message={snackBarMessageSuccess}
              />
            </Snackbar>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default CreateTicket;
