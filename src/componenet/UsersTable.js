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

const UsersTable = () => {
  // the api end point
  const api = axios.create({
    baseURL: `https://fishys.000webhostapp.com/`,
  });

  // the columnes
  let columns = [
    { title: "firstName", field: "firstName" },
    { title: "lastName", field: "lastName" },
    { title: "email", field: "email" },
    { title: "number", field: "number", type: "numeric" },
    { title: "password", field: "password" },
    { title: "id", field: "id", editable: "never" },
  ];
  const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // headers
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  // get the users data (Profilees)
  useEffect(() => {
    api
      .get(`/users.php?type=users`, headers)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    // update the data using patch
    api
      .patch("/users.php?type=usersUpdate&id=" + newData.id, newData)
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
    console.log(newData);

    api
      .post("/users.php?type=usersCreate", newData)
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

  // delete user
  const handleRowDelete = (oldData, resolve) => {
    api
      .delete(`/users.php?type=usersDelete&idtoDelete=${oldData.id}`)
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
        title="users"
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{
          pageSizeOptions: [5],
          exportButton: true,
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
    </div>
  );
};

export default UsersTable;
