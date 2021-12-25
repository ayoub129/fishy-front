import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  Box,
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { format } from "date-fns";

// get the icons
const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox className="text-success" {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check {...props} ref={ref} className="text-success" />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} className="text-danger" />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} className="text-danger" />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} ref={ref} className="text-warning" />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const CustomDatePicker = (props) => {
  const [date, setDate] = useState(null);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date picker"
        format="dd/MM/yyyy"
        clearable
        value={date}
        onChange={(event) => {
          console.log("Date picker value: ", event);
          console.log(props.columnDef.tableData.id);

          setDate(event);
          props.onFilterChanged(props.columnDef.tableData.id, event);
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const BoatsTable = () => {
  // the api end point
  const api = axios.create({
    baseURL: `http://localhost/fish/api2/`,
  });

  // the columnes
  let columns = [
    { title: "id", field: "id", editable: "never" },
    { title: "boat", field: "boat" },
    { title: "type", field: "type" },
    { title: "number", field: "number", type: "numeric" },
    { title: "price", field: "price", type: "numeric" },
    { title: "onp", field: "onp", type: "numeric" },
    { title: "total", field: "total", editable: "never", type: "numeric" },
    {
      title: "date",
      field: "date",
      type: "date",
      dateSetting: { locale: "en-GB" },
      filterComponent: (props) => <CustomDatePicker {...props} />,
    },
  ];

  const [data, setData] = useState([]); //table data
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // headers
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const [Fromday, handleFromdayChange] = useState(null);
  const [Todate, handleTodayChange] = useState(null);
  const [search, setSearch] = useState("");

  // get the boats data
  useEffect(() => {
    api
      .get(`/boats.php?type=boats`, headers)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  }, [search]);

  const fromdate = format(new Date(Fromday), "yyyy-MM-dd");
  const to = format(new Date(Todate), "yyyy-MM-dd");

  const filtring = () => {
    api
      .get(
        `/boats.php?type=filtering&fromdate=${fromdate}&todate=${to}`,
        headers
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  };

  const searching = () => {
    api
      .get(`/boats.php?type=searching&searching=${search}`, headers)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  };

  // majmo3
  const [majmo3, setMajmo3] = useState(0);
  let total = 0;
  useEffect(() => {
    data.forEach((d) => {
      total = parseInt(total) + parseInt(d.total);
      setMajmo3(total);
    });
  });

  // sumOnp
  const [Onp, setOnp] = useState(0);
  let sumOnp = 0;
  useEffect(() => {
    data.forEach((d) => {
      sumOnp = parseInt(sumOnp) + parseInt(d.onp);
      setOnp(sumOnp);
    });
  });

  // sumNumber
  const [NumberTotal, setNumberTotal] = useState(0);
  let sumNumber = 0;
  useEffect(() => {
    data.forEach((d) => {
      sumNumber = parseInt(sumNumber) + parseInt(d.number);
      setNumberTotal(sumNumber);
    });
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    // update the data using patch
    api
      .patch(`/boats.php?type=boatsUpdate&id=` + newData.id, newData)
      .then((res) => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
        setIserror(false);
        setErrorMessages([]);
      })
      .catch((error) => {
        setErrorMessages(["Update failed! Server error"]);
        setIserror(true);
        setTimeout(() => setIserror(null), 5000);
        resolve();
      });
  };

  // add new boat
  const handleRowAdd = (newData, resolve) => {
    api
      .post("/boats.php?type=boatsCreate", newData, headers)
      .then((res) => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve();
        setErrorMessages([]);
        setIserror(false);
      })
      .catch((error) => {
        setErrorMessages(["Cannot add data. Server error!"]);
        setTimeout(() => setIserror(null), 5000);
        setIserror(true);
        resolve();
      });
  };

  // delete boat
  const handleRowDelete = (oldData, resolve) => {
    api
      .delete(`/boats.php?type=boatsDelete&idtoDelete=${oldData.id}`)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setTimeout(() => setIserror(null), 5000);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item>
          <Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="From"
                format="yyyy-MM-dd"
                value={Fromday}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleFromdayChange(date)}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Grid>
        <Grid item>
          <Box ml={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="To"
                format="yyyy-MM-dd"
                value={Todate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleTodayChange(date)}
              />
            </MuiPickersUtilsProvider>
          </Box>
        </Grid>
        <Grid item>
          <Box ml={2}>
            <Button
              style={{ backgroundColor: "#00e", color: "white" }}
              onClick={filtring}
            >
              Filter
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box ml={25}>
            <input
              type="text"
              className="search"
              placeholder="Search ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="button" className="btn" onClick={searching}>
              <i className="fas fa-search"></i>
            </button>
          </Box>
        </Grid>
      </Grid>
      <div>
        {iserror && (
          <Alert severity="error">
            {errorMessages.map((msg, i) => {
              return <div key={i}>{msg}</div>;
            })}
          </Alert>
        )}
      </div>
      <MaterialTable
        title="Boats"
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{
          pageSizeOptions: [5],
          exportButton: true,
          search: false,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>numbers</TableCell>
            <TableCell>{NumberTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>onp</TableCell>
            <TableCell>{Onp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>total</TableCell>
            <TableCell>{majmo3}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>benefits</TableCell>
            <TableCell>{parseInt(majmo3) - parseInt(Onp)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BoatsTable;
