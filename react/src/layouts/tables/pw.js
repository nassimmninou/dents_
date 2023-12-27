import Icon from "@mui/material/Icon";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios
import ImageUploadComponent from "./imageupload";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

import Statistiques from "./studentbypw";
import Zfile from "./zfile";



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
function PW() {
    const [Professors, setProfessors] = useState([]);
    const [selectedgroups, setSelectedgroups] = useState([]);
    const [Professor, setProfessor] = useState({
      id: "",
      title: "",
      objectif: "",
  
      docs: "",
      group: [],
    });

    const [groups, setgroups] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [id, setId] = useState(null);
  const url = "http://localhost:8080/api/v1/pws";

  const  columns= [
    { Header: 'title', accessor: 'title', align: 'center' },
    { Header: 'objectif', accessor: 'objectif', align: 'center' },
    { Header: 'docs', accessor: 'docs', align: 'center' },

  ];
  const [rows, setrows] = useState([]);

  const [groupData, setGroupData] = useState({
    name: "",
  });
  const fetchProfessor = async () => {
    setLoading(true);
    try {
      const rep = await axios.get(url);

      setrows(rep.data);


        } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const fetchfetchgroup = async () => {
    const rep = await axios.get("http://localhost:8080/api/v1/groupes");
    setgroups(rep.data);
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
    addProfessorgroups();
  }, [selectedgroups]);
  useEffect(() => {
    fetchfetchgroup();
    fetchProfessor();
  }, []);

  
  const addProfessorgroups = () => {
    const groupArray = selectedgroups.map((group) => ({
      id: group,
      code: "",
      year: "",
    }));
    setProfessor({
      ...Professor,
      group: groupArray,
    });
  };

  
  const reset = () => {
    setProfessor({
      id: "",
      title: "",
      objectif: "",

      docs: "",
      group: [],
    });
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedgroups([]);
  };

  const handleProfessor = (e) => {
    setProfessor({ ...Professor, [e.target.name]: e.target.value });
    console.log(Professors);
  };
  const handlehandlegroupChange = (e) => {
    const groupid = e.target.value;
    if (e.target.checked) {
      setSelectedgroups((prevgroups) => [...prevgroups, groupid]);
    } else {
      setSelectedgroups((prevgroups) =>
        prevgroups.filter((group) => group !== groupid)
      );
    }
  };


  const addProfessor = async () => {
    const ProfessorData = {
      title: Professor.title,
      objectif: Professor.objectif,

      docs: "document_3_1703633276784_TAF.docx",
      group: Professor.group.map((group) => ({
        id: group.id,
        code: group.code,
        year: group.year,
      })),
    };

    try {
      const rep = await axios.post(url, ProfessorData);
      console.log("added")
      reset();
      fetchProfessor();
    } catch (error) {
      console.error("Error adding Professor:", error);
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
          <MDBox >            <MDBox mb={2}>

          <MDInput
              placeholder="title"
              name="title"
              value={Professor.title}
              onChange={handleProfessor}
            />
             <MDInput
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="objectif"
              name="objectif"
              value={Professor.objectif}
              onChange={handleProfessor}
            />


{groups.map((group, index) => (
                <span className="flex m-2 items-center ">
                  <input
                    id={group.id}
                    type="checkbox"
                    value={group.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handlehandlegroupChange}
                  />

                  <label
                    htmlFor={group.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                  >
                    {group.code}
                  </label>
                </span>
              ))}

             </MDBox>
            
            <ImageUploadComponent/>
            <MDBox mt={4} mb={1}>
            
<MDButton variant="gradient" color="dark" onClick={addProfessor}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Ajouter un PW
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

export default PW;
