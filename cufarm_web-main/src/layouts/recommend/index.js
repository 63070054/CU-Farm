import { useState } from "react";
import Papa from "papaparse";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import { observer, inject } from 'mobx-react';
import auth from "../../utilis/auth"
import { useNavigate } from "react-router-dom";
import "./rec.css";

function Recommend(props) {
  // State to store parsed data
  const navigate = useNavigate()
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  const handleSetModelSoil = () => {

    props.modelSoilStore.setModelSoil(values)
  }

  const { user_device } = props.authStore.toJS();

  if (!user_device.device) {

    auth.signOutAndClear();
    navigate("/authentication/sign-in")
    return false
  };

  return (
    <DashboardLayout>
      <DashboardNavbar></DashboardNavbar>
      <div>
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
        <br />
        <br />
        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th className="th" key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td className="td" key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
        <center>
          <MDButton
            component="a"
            onClick={() => handleSetModelSoil()}
            variant="gradient"
            color="info"
          >
            บันทึก
          </MDButton></center>
      </div>
    </DashboardLayout>
  );
}

export default inject("modelSoilStore", "authStore")(observer(Recommend));
