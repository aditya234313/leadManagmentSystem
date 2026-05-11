import axios from "axios";

function LeadList({ leads, fetchLeads }) {
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://leadmanagmentsystem-1.onrender.com/api/leads/${id}`,
        { status }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(
        `https://leadmanagmentsystem-1.onrender.com/api/leads${id}`
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table
      border="1"
      cellPadding="10"
      width="100%"
      style={{
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Source</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.phone}</td>
            <td>{lead.source}</td>

            <td>
              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(
                    lead.id,
                    e.target.value
                  )
                }
              >
                <option value="Interested">
                  Interested
                </option>

                <option value="Not Interested">
                  Not Interested
                </option>

                <option value="Converted">
                  Converted
                </option>
              </select>
            </td>

            <td>
              <button
                onClick={() =>
                  deleteLead(lead.id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeadList;