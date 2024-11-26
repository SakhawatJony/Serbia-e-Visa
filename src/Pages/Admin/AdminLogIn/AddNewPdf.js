import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewPdf = () => {
  const [fileSave, setFileSave] = useState("");
  const [formData, setFormData] = useState({
    trackNum: "",
    imageUrl: "",
    createdBy: "1",
    updatedBy: "2",
  });
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("adminToken");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  console.log("save ", fileSave);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const token = localStorage.getItem("adminToken"); // Retrieve Bearer token

      const formDataToSend = new FormData();
      formDataToSend.append("file", selectedFile); // Append the file to FormData

      try {
        const response = await fetch(
          "https://pdf-project-mauve.vercel.app/user/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend, // Send FormData containing the file
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 409) {
            setError(`Conflict: ${data.message}`);
          } else {
            setError(`Error: ${data.message || "Something went wrong"}`);
          }
          return;
        }

        // Save the file URL from the response
        setFileSave(data?.imageUrl);
        setResponseMessage("PDF uploaded successfully!");

        console.log("Uploaded File URL:", data?.imageUrl); // Log the URL for debugging
      } catch (err) {
        console.error("Error:", err);
        setError("Network error. Please try again later.");
      }
    }
  };
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setError("");

    const token = localStorage.getItem("adminToken"); // Retrieve Bearer token

    // Update `imageUrl` in `formData` dynamically before submission
    const updatedFormData = {
      ...formData,
      imageUrl: fileSave, // Use the latest value of `fileSave`
    };

    try {
      const response = await fetch(
        "https://pdf-project-mauve.vercel.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFormData), // Use the updated `formData`
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError(`Conflict: ${data.message}`);
        } else {
          setError(`Error: ${data.message || "Something went wrong"}`);
        }
        return;
      }

      setResponseMessage("Data uploaded successfully!");
      navigate("/admin/all");
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div style={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h5" sx={{ color: "#19164F" }} gutterBottom>
          Upload PDF Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#19164F",
                py: "5px",
              }}
            >
              Tracking Number
            </Typography>
          </Box>

          <input
            placeholder="Tracking Number"
            style={{
              outline: "none",
              border: "1px solid #19164F",
              width: "500px",
              height: "40px",
              borderRadius: "5px",
            }}
            margin="normal"
            name="trackNum"
            value={formData?.trackNum}
            onChange={handleChange}
            required
          />
          <Box sx={{ my: "20px" }}>
            <label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <Button
                sx={{
                  bgcolor: "#19164F",
                  color: "white",
                  textTransform: "capitalize",
                  ":hover": {
                    bgcolor: "#19164F",
                    color: "white",
                  },
                }}
                onClick={() => document.getElementById("file-upload").click()}
              >
                Upload PDF
              </Button>
            </label>
            {formData.imageUrl && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 1 }}
              >
                {formData.imageUrl}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            sx={{
              marginTop: 2,
              bgcolor: "#19164F",
              color: "white",
              ":hover": {
                bgcolor: "#19164F",
                color: "white",
              },
              textTransform: "capitalize",
            }}
            disabled={(fileSave==="")}
          >
            Submit
          </Button>
        </form>

        {responseMessage && (
          <Typography color="success.main" sx={{ marginTop: 2 }}>
            {responseMessage}
          </Typography>
        )}
        {error && (
          <Typography color="error.main" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default AddNewPdf;
