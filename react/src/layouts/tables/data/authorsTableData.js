import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

const url = "http://localhost:8080/api/v1/groupes";

export default function data() {
  const [rowData, setRowData] = useState([]);

 


  return {
    columns: [
      { Header: 'id', accessor: 'author', width: '45%', align: 'left' },
      { Header: 'code', accessor: 'function', align: 'left' },
      { Header: 'name', accessor: 'status', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],
    rows: rowData,
  };
}
