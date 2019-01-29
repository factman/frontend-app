import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { withStyles, Typography } from "../../../node_modules/@material-ui/core";

const styles = {
  tableCellPadding: {
    padding: "0 5px",
  },
  checkBoxSize: {
    fontSize: "15px",
  },
  checkBoxWidth: {
    width: "15px",
  },
};

class EnhancedTableHead extends React.Component {
  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      edit,
      columnData,
      disableAction,
      disableCheckBox,
      viewItem,
      actionItem,
      classes,
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          {
            disableAction || disableCheckBox
              ? null
              : (
                <TableCell padding="checkbox">
                  <Checkbox
                    className={classes.checkBoxWidth}
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    icon={<CheckBoxOutlineBlank className={classes.checkBoxSize} />}
                    checkedIcon={<CheckBoxIcon className={classes.checkBoxSize} />}
                    indeterminateIcon={
                      <IndeterminateCheckBoxIcon className={classes.checkBoxSize} />
                    }
                    onChange={onSelectAllClick}
                  />
                </TableCell>
              )
          }

          {columnData.map(column => (
            <TableCell
              className={classes.tableCellPadding}
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? "none" : "default"}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  <Typography variant="body2">
                    {column.label}
                  </Typography>
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
          { edit
            ? (
              <TableCell padding="checkbox">
                <Typography variant="body2">
                  Edit
                </Typography>
              </TableCell>
            )
            : null
          }

          {
            viewItem ? (
              <TableCell padding="checkbox">
                <Typography variant="body2">
                  View
                </Typography>
              </TableCell>
            )
              : null
          }

          {
            actionItem ? (
              <TableCell padding="checkbox">
                <Typography variant="body2">
                  Action
                </Typography>
              </TableCell>
            )
              : null
          }
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default withStyles(styles)(EnhancedTableHead);
