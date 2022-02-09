import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import { TablePagination } from "@material-ui/core";

export default function CustomTable(props) {
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    rawClick,
    deleteEntry,
    isEdit = true,
    isDelete = true,
    fullData = false,
  } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const setColumnValue = (keys, data) => {
    let string = "";
    keys.map((key) => {
      string = `${string} ${data[key]}`;
    });
    return string;
  };

  useEffect(() => {
    let intersectList = [];
    tableData.filter((item1) => {
      let intersectDict = {};
      tableHead.some((item2) => {
        if (item2.keys) {
          intersectDict[item2.id] = setColumnValue(item2.keys, item1);
        } else if (item2.selector) {
          intersectDict[item2.id] = item1[item2.id][item2.key];
        } else {
          intersectDict[item2.id] = item1[item2.id];
        }
      });
      intersectList.push(intersectDict);
    });
    setDataList(intersectList);
  }, [tableHead, tableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((column, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={column.id}
                  >
                    {column.id === "id" ? "" : column.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {dataList.map((list, key) => (
            <TableRow key={key} className={classes.tableBodyRow}>
              {Object.keys(list).map((l, key) => {
                return (
                  <TableCell className={classes.tableCell} key={key}>
                    {l.toLocaleLowerCase() === "action" ? (
                      <>
                        {isEdit && (
                          <Button
                            size="sm"
                            color="info"
                            onClick={() => rawClick(fullData ? list : list.id)}
                          >
                            Edit
                          </Button>
                        )}
                        {isDelete && (
                          <Button
                            size="sm"
                            color="rose"
                            onClick={() => deleteEntry(list.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </>
                    ) : (
                      <>{l === "id" ? "" : list[l]}</>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
        colSpan={3}
        count={dataList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        componentsProps={{
          select: {
            "aria-label": "rows per page",
          },
          actions: {
            showFirstButton: true,
            showLastButton: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
};
