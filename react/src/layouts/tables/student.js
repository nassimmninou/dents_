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
import Statistiques from "./StudentByGroupe";
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
function Student() {
  const url = "http://localhost:8080/api/v1/students";

  const  columns= [
    { Header: 'id', accessor: 'id', width: '45%', align: 'left' },
    { Header: 'first name', accessor: 'firstname', align: 'center' },
    { Header: 'first name', accessor: 'lastname', align: 'center' },
    { Header: 'groupe', accessor: 'groupe', align: 'center' },
    { Header: 'action', accessor: 'action', align: 'center' },
  ];
  const [rows, setrows] = useState([]);
  const [majors, setMajors] = useState([]);
  const [student, setStudent] = useState({
    id: "",

    login: "",
    password: "",
    firstName: "",
    lastName: "",

    group: {
      id: "",
      code: "",
      year: "",
    },
  });

  const [groupData, setGroupData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchMajor = async () => {
    const rep = await axios.get("http://localhost:8080/api/v1/groupes");
    setMajors(rep.data);
  };

  useEffect(() => {
    fetchMajor();
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const formattedData = response.data.map(item => ({
        id: item.id,
        firstname: <Job title={item.firstName} />,
        lastname: item.lastName,
        groupe:item.group.code,
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

  const handleStudent = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    console.log(rows);
    console.log(student);
  };

  const handleMajor = (e) => {
    const selectedMajorId = e.target.value;
    setStudent((prevStudent) => ({
      ...prevStudent,
      group: {
        ...prevStudent.group,
        id: selectedMajorId,
      },
    }));
  };
  
  
  const reset = () => {
    setStudent({
      id: "",
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      grade: "",

      group: {
        id: "",
        code: "",
        year: "",
      },
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const addStudent = async () => {
    try {
      console.log(student); // Verify student data
      const response = await axios.post(url, student);
      console.log('Response:', response.data); // Check server response if needed
      reset(); // Reset the form after successful submission
      fetchData(); // Refresh data after addition
    } catch (error) {
      console.error('Error adding student:', error);
      // Handle error scenarios (display message, log, etc.)
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
    fetchMajor();
    fetchData();
  }, []);



  const handleGroupData = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const addGroup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/students",
        groupData
      );
      // After adding, fetch the updated groups
      fetchData(); // Refresh data after deletion
      // Notify about addition
    } catch (error) {
      console.error("Error adding group: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent();
  };
  

  const updateGroup = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/groupes/${groupData.id}`,
        groupData
      );
      fetchGroups();
      setGroupData({ code: "", name: "" });
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
  label="first name"
  variant="standard"
  fullWidth
  name="firstName"
  value={student.firstName}

  onChange={handleStudent}
/> 
<MDInput
  type="text"
  label="last name"
  variant="standard"
  fullWidth
  name="lastName"
  value={student.lastName}
  onChange={handleStudent}
/> 
<MDInput
  type="text"
  label="login"
  variant="standard"
  fullWidth
  name="login"
  value={student.login}

  onChange={handleStudent}
/> 
<MDInput
  type="password"
  label="password"
  variant="standard"
  fullWidth
  value={student.password}

  name="password"
  onChange={handleStudent}
/> 
<select
  className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
  value={student.group.id}
  onChange={handleMajor}
>
  <option className="text-gray-700">
    Select group for student
  </option>
  {majors.map((major) => (
    <option key={major.id} value={major.id}>
      {major.year}
    </option>
  ))}
</select>

            
             </MDBox>
            
            <MDBox mt={4} mb={1}>
            
<MDButton variant="gradient" color="dark" onClick={addStudent}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Ajouter un etudiant
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
      <Grid   alignItems="center">
        <Card>
              <Statistiques />
              </Card>
              </Grid>

      
      
    </DashboardLayout>
  );
}

export default Student;
