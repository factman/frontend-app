import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Typography from "@material-ui/core/Typography";
/**
 * @requires EnhancedTableHead
 * @@requires EnhancedTableToolbar
 */
import EnhancedTableHead from "./EnhanceTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import ImagePlaceholder from "../Images/ImagePlaceholder";
import Validator from "../../helpers/validator";


const styles = theme => ({
  root: {
    width: "100%",
    padding: "20px",
  },
  table: {
    minWidth: 200,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  input: {
    display: "none",
  },
  tableCellPadding: {
    padding: "0 5px",
  },
  checkBoxSize: {
    fontSize: "15px",
  },
  checkBoxWidth: {
    width: "15px",
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    const { orderBy, columnData } = this.props;
    this.state = {
      order: "asc",
      orderBy,
      selected: [],
      page: 0,
      rowsPerPage: 10,
      columnData,
      dataState: [],
      currentRowSelected: "",
    };
  }

  componentDidMount() {
    // This is so add no-bar to body for this component
    document.body.className = "no-bar";
  }

  componentWillReceiveProps(newProps) {
    const { data, currentSelected } = this.props;
    if (Validator.propertyExist(newProps, "data") && !isEqual(newProps.data, data)) {
      this.setState({
        dataState: newProps.data,
      });
    }

    if (Validator.propertyExist(newProps, "currentSelected") && !isEqual(newProps.currentSelected, currentSelected)) {
      this.setState({ selected: [] });
    }
  }

  componentWillUnmount() {
    // Remove the no-bar class from body
    document.body.className = "";
  }

  handleRequestSort = (event, property) => {
    const orderByNew = property;
    let orderNew = "desc";
    const { orderBy, order } = this.state;

    if (orderBy === property && order === "desc") {
      orderNew = "asc";
    }

    this.setState({ order: orderNew, orderBy: orderByNew });
  };

    handleSelectAllClick = (event, checked) => {
      const { id } = this.props;
      if (checked) {
        const { dataState } = this.state;
        this.setState({
          selected: dataState.map(n => n[id]),
        });
        return;
      }
      this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
      this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
      this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = (id) => {
      const { selected } = this.state;
      return selected.indexOf(id) !== -1;
    }

    handleSelectedRow = (data, evt) => {
      const { id } = this.props;
      if (evt.target.tagName.toLowerCase() !== "input") {
        const { getCurrentRowData } = this.props;
        this.setState({
          currentRowSelected: data[id],
        });
        if (getCurrentRowData) {
          getCurrentRowData(data);
        }
      }
    }

    getSorting = (order, orderBy) => {
      const { id } = this.props;
      return order === "desc"
        ? (a, b) => {
          if (b[orderBy] < a[orderBy]) return -1;
          if (b[orderBy] > a[orderBy]) return 1;
          return (b[id] < a[id] ? -1 : 1);
        } : (a, b) => {
          if (b[orderBy] < a[orderBy]) return 1;
          if (b[orderBy] > a[orderBy]) return -1;
          return (a[id] < b[id] ? -1 : 1);
        };
    }

    render() {
      const {
        data, classes, tableTitle, properties, editButton, imagePanelDisplay,
        onDeleteClickSpec, itemName, postImage, collection, sliderDisplay,
        brands, categories, disableAction, disableCheckBox, vendors, viewItem,
        actionItem, noPagination, noTableToolBar, id,
      } = this.props;
      const {
        order, orderBy, selected, rowsPerPage,
        page, columnData, currentRowSelected,
      } = this.state;
      const counter = typeof data === "object" ? data.length : 0;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, counter - (page * rowsPerPage));
      let tablebody;
      if (typeof data === "object") {
        tablebody = data
          .sort(this.getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((n, pkey) => {
            const isSelected = this.isSelected(n[id]);
            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={n[id]}
                selected={isSelected || n[id] === currentRowSelected}
                onClick={e => this.handleSelectedRow(n, e)}
              >
                {
                  disableAction || disableCheckBox
                    ? null
                    : (
                      <TableCell padding="checkbox" onClick={event => this.handleClick(event, n[id])}>
                        <Checkbox
                          className={classes.checkBoxWidth}
                          checked={isSelected}
                          icon={<CheckBoxOutlineBlank className={classes.checkBoxSize} />}
                          checkedIcon={<CheckBoxIcon className={classes.checkBoxSize} />}
                          indeterminateIcon={
                            <IndeterminateCheckBoxIcon className={classes.checkBoxSize} />
                          }
                        />
                      </TableCell>
                    )
                }
                {properties.map((property) => {
                  let tableCellContent;
                  if (property.img) {
                    tableCellContent = (
                      <ImagePlaceholder
                        srcImage={n[property.name]}
                        label={property.name}
                        fileInput={`${property.name}${n[id]}`}
                        width={property.width}
                        height={property.height}
                        postImage={postImage}
                        collection={collection}
                        eachData={n}
                      />
                    );
                  } else if (property.imgArr) {
                    tableCellContent = (
                      <ImagePlaceholder
                        srcImage={n[property.name][0]}
                        label={property.name}
                        fileInput={`${property.name}${n[id]}`}
                        width={property.width}
                        height={property.height}
                        postImage={postImage}
                        collection={collection}
                        eachData={n}
                        fullwidth={property.widthSize}
                      />
                    );
                  } else if (property.ucword) {
                    tableCellContent = Validator.propertyExist(n, property.name)
                      ? n[property.name].replace(/^\w/, c => c.toUpperCase()) : null;
                  } else if (property.brandMap) {
                    [tableCellContent] = brands.filter(
                      brand => (brand.brandId === n[property.name]),
                    )
                      .map(brand => brand.name);
                  } else if (property.vendorMap) {
                    [tableCellContent] = vendors.filter(
                      vendor => (vendor.vendorId === n[property.name]),
                    )
                      .map(vendor => vendor.domainName);
                  } else if (property.catMap) {
                    [tableCellContent] = categories
                      .filter(
                        category => (category.categoryId === n[property.name][property.catMain]),
                      )
                      .map(category => category.name);
                  } else if (property.subname) {
                    tableCellContent = Validator.propertyExist(n, property.name, property.subname)
                      ? n[property.name][property.subname] : null;
                  } else if (property.grandChild) {
                    tableCellContent = Validator.propertyExist(
                      n, property.name, property.parent, property.grandChild,
                    )
                      ? n[property.name][property.parent][property.grandChild] : null;
                  } else if (property.date) {
                    const date = Validator.propertyExist(n, property.name)
                      ? n[property.name].match(/^\d{4}[/-](0?[1-9]|1[012])[/-]\d{2}/) : [null];
                    [tableCellContent] = date;
                  } else if (property.typography) {
                    tableCellContent = Validator.propertyExist(n, property.name)
                      ? (
                        <Typography
                          paragraph
                        >
                          {n[property.name]}
                        </Typography>
                      ) : null;
                  } else if (property.children) {
                    tableCellContent = (property.children.map(child => (
                      Validator.propertyExist(n, property.name, child)
                        ? (
                          <p key={child}>
                            {
                              child.replace(/^\w/, c => c.toUpperCase())
                            }
                          </p>
                        ) : null
                    )));
                  } else if (property.collection) {
                    const [collect] = property.collection
                      .filter(field => field[id] === n[property.name]);
                    if (Validator.propertyExist(collect, property.parentName)) {
                      tableCellContent = collect[property.parentName];
                    } else {
                      tableCellContent = "";
                    }
                  } else {
                    tableCellContent = Validator.propertyExist(n, property.name)
                      ? n[property.name] : null;
                  }
                  return (
                    <TableCell
                      className={classes.tableCellPadding}
                      key={`${n[id]}.${property.name}`}
                      component={property.component === true ? "th" : "td"}
                      padding={property.padding === true ? "none" : "default"}
                      numeric={property.numeric}
                    >
                      {tableCellContent}
                    </TableCell>);
                })}
                {
                  sliderDisplay ? sliderDisplay(n) : null
                }
                {
                  imagePanelDisplay ? imagePanelDisplay(n) : null
                }
                {
                  editButton ? editButton(n) : null
                }
                {
                  viewItem ? viewItem(n) : null
                }
                {
                  actionItem ? actionItem(n) : null
                }
              </TableRow>
            );
          });
      } else {
        tablebody = (
          (emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          ))
        );
      }
      return (
        <Paper className={classes.root}>
          {
            noTableToolBar ? null : (
              <EnhancedTableToolbar
                numSelected={selected.length}
                itemName={itemName}
                tableTitle={tableTitle}
                onDeleteClick={() => onDeleteClickSpec(selected)}
              />
            )
          }
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                columnData={columnData}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={counter}
                edit={editButton}
                disableAction={disableAction}
                disableCheckBox={disableCheckBox}
                viewItem={viewItem}
                actionItem={actionItem}
              />
              <TableBody>
                {tablebody}
              </TableBody>
            </Table>
          </div>
          {
            noPagination ? null : (
              <TablePagination
                component="div"
                count={counter > 0 ? counter : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                rowsPerPageOptions={[3, 5, 10, 25, 50, 100]}
              />
            )
          }
        </Paper>
      );
    }
}

EnhancedTable.defaultProps = {
  id: "id",
};

EnhancedTable.propTypes = {
  id: PropTypes.string,
};

export default withStyles(styles)(EnhancedTable);
