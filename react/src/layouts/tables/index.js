/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";



import MDInput from "components/MDInput";

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
function Tables() {
  const url = "http://localhost:8080/api/v1/groupes";

  const  columns= [
    { Header: 'id', accessor: 'author', width: '45%', align: 'left' },
    { Header: 'code', accessor: 'function', align: 'left' },
    { Header: 'name', accessor: 'status', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ];
  const [rows, setrows] = useState([]);

  const [groupData, setGroupData] = useState({
    code: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  // ... other state variables and functions

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const formattedData = response.data.map(item => ({
        author: item.id,
        function: <Job title={item.code} />,
        status: item.year,
        action: (
          <div>
            <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <MDBox mr={1}>
                <MDButton variant="text" color="error" onClick={() => handleDelete(item.id)}>
                  <Icon>delete</Icon>&nbsp;
                </MDButton>
              </MDBox>
              <MDButton variant="text" color="dark">
                <Icon>edit</Icon>&nbsp;
              </MDButton>
            </MDBox>
          </div>
        ),
      }));
      setrows(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleGroupData = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const addGroup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/groupes",
        groupData
      );
      // After adding, fetch the updated groups
      fetchData(); // Refresh data after deletion
      setGroupData({ code: "", year: "" });
      // Notify about addition
    } catch (error) {
      console.error("Error adding group: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGroup();
  };
  

  const updateGroup = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/groupes/${groupData.id}`,
        groupData
      );
      fetchGroups();
      setGroupData({ code: "", name: "" });
      // Notify about update
    } catch (error) {
      console.error("Error updating group: ", error);
    }
  };

  const deleteGroup = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/groupes/${id}`
      );
      fetchGroups();
      // Notify about deletion
    } catch (error) {
      console.error("Error deleting group: ", error);
    }
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6} >
          <Grid item xs={12} id="delete-account">
            <Card>

          <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>            <MDBox mb={2}>
            <MDInput
  type="text"
  label="Code"
  variant="standard"
  fullWidth
  name="code"
  value={groupData.code}
  onChange={handleGroupData}
/>            </MDBox>
            <MDBox mb={2}>
            <MDInput
  type="text"
  label="Nom"
  variant="standard"
  fullWidth
  name="year"
  value={groupData.year}
  onChange={handleGroupData}
/>            </MDBox>

            <MDBox mt={4} mb={1}>
            
<MDButton variant="gradient" color="dark" onClick={addGroup}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Ajouter un Groupe
        </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>

        </Card>


        <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox> 
          </Grid>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default Tables;
