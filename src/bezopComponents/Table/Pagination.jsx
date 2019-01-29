import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import withStyles from "@material-ui/core/styles/withStyles";
import { secondaryBackground } from "../../assets/jss/material-kit-react";

const spacerClasses = {
  spacer: {
    display: "inline-block",
    paddingLeft: "10%",
  },
  select: {
    paddingRight: "25px",
  },
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      numberOfRowsPerPage: 5,
    };
  }

  componentWillReceiveProps(newProps) {
    const { rowsPerPage, page } = newProps;
    const { pageNumber, numberOfRowsPerPage } = this.state;
    if (rowsPerPage !== numberOfRowsPerPage && rowsPerPage !== undefined) {
      this.setState({
        numberOfRowsPerPage: rowsPerPage,
      });
    }

    if (pageNumber !== page && page !== undefined) {
      this.setState({
        pageNumber: page,
      });
    }
  }

  handleChangePage = (event, page) => {
    const { pageHandler } = this.props;
    this.setState({ pageNumber: page });
    if (pageHandler) {
      pageHandler(page);
    }
  };

  handleChangeRowsPerPage = (event) => {
    const { rowsPerPageHandler } = this.props;
    this.setState({ numberOfRowsPerPage: event.target.value });
    if (rowsPerPageHandler) {
      rowsPerPageHandler(event.target.value);
    }
  };

  render() {
    const { data, classes } = this.props;
    const { numberOfRowsPerPage, pageNumber } = this.state;
    return (
      <div style={{ ...secondaryBackground }}>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={numberOfRowsPerPage}
          page={pageNumber}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 30]}
          classes={{
            spacer: classes.spacer,
            select: classes.select,
          }}
        />
      </div>
    );
  }
}

export default withStyles(spacerClasses)(Pagination);
