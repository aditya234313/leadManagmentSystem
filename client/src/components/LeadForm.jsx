import { useState } from "react";
import axios from "axios";

function LeadForm({ fetchLeads }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "Call",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.source
    ) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(
        "https://leadmanagmentsystem-1.onrender.com/api/leads",
        formData
      );

      setFormData({
        name: "",
        phone: "",
        source: "Call",
      });

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={{
          padding: "10px",
          flex: 1,
        }}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        style={{
          padding: "10px",
          flex: 1,
        }}
      />

      <select
        name="source"
        value={formData.source}
        onChange={handleChange}
        style={{
          padding: "10px",
        }}
      >
        <option value="Call">Call</option>
        <option value="WhatsApp">
          WhatsApp
        </option>
        <option value="Field">Field</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Add Lead
      </button>
    </form>
  );
}

export default LeadForm;