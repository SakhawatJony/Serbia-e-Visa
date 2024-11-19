import {
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { RiVisaFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EVisaPortal = () => {
  const [visaID, setVisaID] = useState(""); // State to hold the input value
  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success messages
  const [loading, setLoading] = useState(false); // State to track loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visaID) {
      setError("e-Visa ID is required!"); // Show error if ID is empty
      setSuccess(""); // Clear success message
      setSnackbarOpen(false); // Close Snackbar if there's an error
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      const response = await fetch(`https://pdf-project-mauve.vercel.app/user/${visaID}`);

      if (!response.ok) {
        throw new Error("Visa not found!");
      }

      const data = await response.json();
      setError("");
      setSuccess("Visa retrieved successfully!"); // Set success message
      setSnackbarOpen(true);

      // Delay navigation to let the user see the success message
      navigate("/visacopy", {
        state: { data, successMessage: "Visa retrieved successfully!" }, // Pass success message along with data
      });
    } catch (error) {
      setError(error.message || "An error occurred!");
      setSuccess(""); // Clear success message
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Stop loading spinner
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
            height: { xs: "auto", sm: "350px" }, // Responsive height
            px: { xs: "20px", sm: "100px" }, // Adjust padding for small screens
            mt: "20px",
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
              <Typography sx={{ color: "#4064AE", fontSize: { xs: "18px", sm: "22px" } }}>
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
                    width: "200px", // Make input field responsive
                    marginTop: "10px",
                    height: "26px",
                    outline: "none",
                    border: "1px solid grey",
                  }}
                />
                {/* Display error message if visaID is empty */}
                {error && (
                  <Typography sx={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                    {error}
                  </Typography>
                )}
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
                    position: "relative", // To position the loader inside the button
                  }}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "white",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        marginLeft: "-12px", // To center the spinner
                        marginTop: "-12px", // To center the spinner
                      }}
                    />
                  ) : (
                    <>
                      Confirm <IoIosArrowForward />
                    </>
                  )}
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
          severity={error ? "error" : "success"} // Determine the type of alert
          sx={{ width: "100%" }}
        >
          {error || success} {/* Show error or success message */}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EVisaPortal;
