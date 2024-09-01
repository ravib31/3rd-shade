import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 

const LeadDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Failed to fetch leads. Please try again.");
    }
  };

  const exportData = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  const colParams = { sortable: true, filter: true, resizable: true };
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Channel Partner Code",
        field: "channelPartnerCode",
        ...colParams,
      },
      {
        headerName: "Lead Name",
        field: "leadName",
        ...colParams,
      },
      {
        headerName: "Contact Number",
        field: "contactNumber",
        ...colParams,
      },
      {
        headerName: "Email ID",
        field: "emailId",
        ...colParams,
      },
      {
        headerName: "Lead Source",
        field: "leadSource",
        ...colParams,
      },
      {
        headerName: "Lead Interest",
        field: "leadInterest",
        ...colParams,
      },
      {
        headerName: "Submission Date",
        field: "createdAt",
        ...colParams,
        valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
      },
    ],
    [colParams]
  );

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "600px" }}>
      <button
        onClick={exportData}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition duration-200"
      >
        Export Data
      </button>
      <AgGridReact
        rowData={leads}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={20}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default LeadDashboard;
