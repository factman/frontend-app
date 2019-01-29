import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function SimpleTable(props) {
  const { classes, title, Icon, color, data } = props;

  return (
    <Paper className={classes.paper} elevation={4}>
      <Typography align="left" variant="title" style={{ padding: "15px", backgroundColor: color }}>
        <span>
          {Icon}
          {" "}
          {title}
        </span>
      </Typography>
      <Table>
        <TableBody>
          {(data && data.length > 0) ? data.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                {row.title}
              </TableCell>
              <TableCell numeric>
                {row.date}
              </TableCell>
            </TableRow>
          ))
            : (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography align="center" variant="subheading">
                    <Paper elevation={0}>
                      --- Empty ---
                    </Paper>
                  </Typography>
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default (SimpleTable);
