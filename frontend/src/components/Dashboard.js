import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leads/summary",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  if (!summary) {
    return <div>Loading...</div>;
  }

  const channelPartnerData = {
    labels: summary.leadsByChannelPartner.map((item) => item._id),
    datasets: [
      {
        label: "Leads by Channel Partner",
        data: summary.leadsByChannelPartner.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const leadSourceData = {
    labels: summary.leadsBySource.map((item) => item._id),
    datasets: [
      {
        label: "Leads by Source",
        data: summary.leadsBySource.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="m-4 md:m-10 bg-gray-50 p-4 md:p-8 rounded-lg">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-600 p-4 bg-white rounded-lg shadow-md">
          Summary Dashboard
        </h2>
      </div>

      <p className="text-base md:text-lg font-medium text-gray-700 mb-6">
        Total Leads Submitted: {summary.totalLeads}
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="w-fit md:w-2/3 h-fit lg:h-96 bg-white p-6 rounded-lg shadow-md">
          <Bar data={channelPartnerData} />
        </div>
        <div className="w-fit md:w-1/3 h-fit lg:h-96 bg-white p-6 rounded-lg shadow-md">
          <Pie data={leadSourceData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
