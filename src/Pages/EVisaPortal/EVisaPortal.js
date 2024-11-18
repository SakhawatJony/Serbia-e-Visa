import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { RiVisaFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EVisaPortal = () => {
  const [visaID, setVisaID] = useState(""); // State to hold the input value
  const [error, setError] = useState(""); // State to hold error messages
const navigate = useNavigate()
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visaID) {
      setError("e-Visa ID is required!");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`https://pdf-project-mauve.vercel.app/user/${visaID}`);

      if (!response.ok) {
        throw new Error("Visa is not found!");
      }

      const data = await response.json();
      setError("");

      // Navigate to /visacopy and pass data as state
      navigate("/visacopy", { state: { visaData: data } });
    } catch (error) {
      setError(error.message || "An error occurred!");
      setSnackbarOpen(true);
    }
  };


  // Function to close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box>
      {/* Main Content */}
      <Container>
        <Box
          sx={{
            border: "1px solid #1D2D7A",
            borderRadius: "8px",
            height: "400px",
            px: "100px",
            py: "30px",
          }}
        >
          {/* Header Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Box
              sx={{
                bgcolor: "#4064AE",
                height: "45px",
                width: "45px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiVisaFill style={{ color: "white", fontSize: "25px" }} />
            </Box>
            <Box sx={{ borderBottom: "1px solid #4064AE", width: "100%" }}>
              <Typography sx={{ color: "#4064AE", fontSize: "22px" }}>
                Portal of Serbia e-Visa
              </Typography>
            </Box>
          </Box>

          {/* Form Section */}
          <Box sx={{ mt: "25px" }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label style={{ color: "black", fontSize: "15px" }}>
                  <span style={{ color: "red", paddingRight: "5px" }}>*</span>
                  e-Visa ID
                </label>
                <input
                  value={visaID}
                  onChange={(e) => setVisaID(e.target.value)} // Update visaID state
                  placeholder="Enter ID here"
                  style={{
                    paddingLeft: "10px",
                    fontSize: "15px",
                    width: "200px",
                    marginTop: "10px",
                    height: "26px",
                    outline: "none",
                    border: "1px solid grey",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: "50px",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    background: "rgb(111 172 68)",
                    color: "white",
                    ":hover": {
                      background: "#FEFEFD",
                      color: "#4064AE",
                      border: "1px solid #4064AE",
                    },
                    textTransform: "capitalize",
                    borderRadius: "none",
                    width: "150px",
                    height: "40px",
                  }}
                >
                  Confirm <IoIosArrowForward />
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Automatically close after 3 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error" // You can use "error", "success", "warning", or "info"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EVisaPortal;
