import React, { useState } from "react";
import "./Complaint.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const UserComplaintForm = () => {
  const [createComplaint, setCreateComplaint] = useState({
    accused: "",
    description: "",
    date: "", // Date field for the complaint
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track form submission status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submitting");
      const complaintPayload = {
        accused: createComplaint.accused,
        description: createComplaint.description,
        date: createComplaint.date,
      };

      const token = localStorage.getItem("mySecret");
      const url = "http://localhost:3000/api/complaint/";

      const { data: res } = await axios.post(
        url,
        JSON.stringify(complaintPayload),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token correctly
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      console.log("Complaint submitted successfully:", res);
      setSubmitted(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateComplaint({ ...createComplaint, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="user-complaint-form">
        <h2>Complain About a User</h2>
        {submitted ? (
          <p>Thank you for your complaint. We will review it shortly.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Accused Email:
                <input
                  type="email"
                  name="accused"
                  value={createComplaint.accused}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Complaint:
                <input
                  name="description"
                  value={createComplaint.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={createComplaint.date}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {error && <p className="error">{error}</p>}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserComplaintForm;
