/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { observer, inject } from "mobx-react";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import moment from 'moment';
// Images
import team2 from "assets/images/team-2.jpg";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables(props) {
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  useEffect(() => {
    const init = async () => {
      await props.userStore.getAllUser();
    };
    init();
  }, [props.userStore.data]);
  const { allUser } = props.userStore.toJS();
  const navigate = useNavigate();
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const handleDashboard = (user) => {
   
    navigate("/dashboardUser", { state: user})
  };

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  User Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {allUser.data && (allUser.data).map((customer, index) => (
                  <DataTable
                    table={{
                      columns: [
                        { Header: "name-email", accessor: "author", width: "45%", align: "left" },
                        { Header: "address", accessor: "function", align: "left" },
                        { Header: "telephone", accessor: "tel", align: "center" },
                        { Header: "birth date", accessor: "birthdate", align: "center" },
                        { Header: "status", accessor: "status", align: "center" },
                        { Header: "date update", accessor: "employed", align: "center" },
                        { Header: "action", accessor: "action", align: "center" },
                      ],
                      rows: [
                        {
                          author: <Author image={team2} name={customer.name} email={customer.email} />,
                          function: <Job title={customer.address} description="Organization" />,
                          status: (
                            <MDBox ml={-1}>
                              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
                            </MDBox>
                          ),
                          tel: (
                            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                              {customer.tel}
                            </MDTypography>
                          ),
                          birthdate: (
                            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                              {moment(customer.birth).format("dddd,Do MMMM  YYYY")}
                            </MDTypography>
                          ),
                          employed: (
                            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
                              {customer.ID}
                            </MDTypography>
                          ),
                          action: (
                            <MDTypography component="a" onClick={() => handleDashboard(customer.user)} variant="caption" color="text" fontWeight="medium">
                              More
                            </MDTypography>
                          ),
                        }
                      ]
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                ))}
              </MDBox>
            </Card>
          </Grid>

          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default inject("userStore", "authStore")(observer(Tables));
