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
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState,useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  
  const [Professors, setProfessors] = useState([]);
  const [selectedgroups, setSelectedgroups] = useState([]);
  const [Professor, setProfessor] = useState({
    id: "",
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    grade: "",
    group: [],
  });
  const [groups, setgroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [id, setId] = useState(null);
  const url = "http://localhost:8080/api/v1/professors";

  const fetchProfessor = async () => {
    setLoading(true);
    try {
      const rep = await axios.get(url);
      setProfessors(rep.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchfetchgroup = async () => {
    const rep = await axios.get("http://localhost:8080/api/v1/groupes");
    setgroups(rep.data);
  };

  useEffect(() => {
    fetchfetchgroup();
    fetchProfessor();
  }, []);

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

  useEffect(() => {
    addProfessorgroups();
  }, [selectedgroups]);

  const handleUpdate = async (id) => {
    const rep = await axios.get(`${url}/${id}`);
    setProfessor(rep.data);
    setUpdateMode(true);
    setSelectedgroups([]);
  };

  // const handlehandlegroupUpdate = () =>{
  //   Professor.groups.forEach((group) => {
  //     setSelectedgroups((prevgroups) => [...prevgroups, group.id]);
  //   })
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //   checkboxes.forEach((checkbox) => {
  //     if(selectedgroups.includes(checkbox.id))
  //     checkbox.checked = true;
  //   });

  // }

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
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      grade: "",
      group: [],
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedgroups([]);
  };

  const addProfessor = async () => {
    const ProfessorData = {
      firstName: Professor.firstName,
      lastName: Professor.lastName,
      login: Professor.login,
      password: Professor.password,
      grade: Professor.grade,
      group: Professor.group.map((group) => ({
        id: group.id,
        code: group.code,
        year: group.year,
      })),
    };

    try {
      const rep = await axios.post(url, ProfessorData);
      notify("added");
      reset();
      fetchProfessor();
    } catch (error) {
      console.error("Error adding Professor:", error);
    }
  };

  const updateProfessor = async () => {
    console.log(Professor);
    const rep = await axios.put(`${url}/${Professor.id}`, Professor);
    reset();
    fetchProfessor();
    notify("updated");
  };

  const deleteProfessor = async () => {
    const rep = await axios.delete(`${url}/${id}`);
    fetchProfessor();
    closeModal();
    notify("deleted");
  };

  //////modal toastify
  const [modal, setModal] = useState(false);

  const showModal = (stuid) => {
    setId(stuid);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const notify = (op) =>
    toast.success(`Professor ${op} successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
    <Grid>
    <span className="flex items-center justify-center w-11/12">
            <MDInput
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="firstName"
              name="firstName"
              value={Professor.firstName}
              onChange={handleProfessor}
            />

            <MDInput
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="lastName"
              name="lastName"
              value={Professor.lastName}
              onChange={handleProfessor}
            />
            <MDInput
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@login"
              name="login"
              value={Professor.login}
              onChange={handleProfessor}
            />
            <MDInput
              className="flex text-gray-700 outline-none border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-3"
              placeholder="@grade"
              name="grade"
              value={Professor.grade}
              onChange={handleProfessor}
            />
          </span>
          <span className="flex items-center justify-center w-11/12">
            <MDInput
              className="flex text-gray-700 outline-none  border-gray-300 border py-3 pl-4 rounded-xl focus:ring-1 w-1/3 m-2"
              placeholder="password"
              name="password"
              type="password"
              disabled={updateMode}
              value={Professor.password}
              onChange={handleProfessor}
            />
          </span>
          <span className="flex items-center justify-center w-11/12">
            <span className="flex w-2/3 m-1 items-center ml-20">
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
            </span>
          </span>

            <MDButton variant="gradient" color="dark" onClick={addProfessor}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;Ajouter un professeur
        </MDButton>

          </Grid>
          
    </DashboardLayout>
  );
}

export default Overview;
