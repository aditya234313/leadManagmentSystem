import { useEffect, useState } from "react";
import axios from "axios";

import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        "https://leadmanagmentsystem-1.onrender.com"
      );

      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
        }}
      >
        Lead Management System
      </h1>

      <LeadForm fetchLeads={fetchLeads} />

      <LeadList
        leads={leads}
        fetchLeads={fetchLeads}
      />
    </div>
  );
}

export default App;