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

const EVisaPortal = () => {
  const [visaID, setVisaID] = useState(""); // State to hold the input value
  const [error, setError] = useState(""); // State to hold error messages
  const [success, setSuccess] = useState(""); // State to hold success messages
  const [loading, setLoading] = useState(false); // State to track loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [pdfprintUrl, setPdfPrintUrl] = useState(""); // Visa image URL

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
      const response = await fetch(
        `https://pdf-project-mauve.vercel.app/user/${visaID}`
      );

      if (!response.ok) {
        throw new Error("Visa not found!");
      }

      const data = await response.json();
      setError("");
      setSuccess("Visa retrieved successfully!"); // Set success message
      setSnackbarOpen(true);

      setPdfPrintUrl(data?.imageUrl);
    } catch (error) {
      setError(error.message || "An error occurred!");
      setSuccess(""); // Clear success message
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handlePrint = () => {
    if (pdfprintUrl) {
      // Create an invisible iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // Make the iframe invisible
      iframe.src = pdfprintUrl; // Set the PDF URL as the iframe source
      
      // Wait until the iframe loads the PDF
      iframe.onload = () => {
        iframe.contentWindow.print(); // Trigger the print dialog
      };
  
      // Append the iframe to the document body
      document.body.appendChild(iframe);
  
      // Clean up: Remove the iframe after a delay
      setTimeout(() => document.body.removeChild(iframe), 1000);
    } else {
      alert("No PDF URL available to print!");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Container>
        <Box
          sx={{
            border: "1px solid #1D2D7A",
            borderRadius: "8px",
            height: { xs: "auto", sm: "350px" },
            px: { xs: "20px", sm: "100px" },
            mt: "20px",
            py: "30px",
          }}
        >
          {pdfprintUrl ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: 600,
                    fontSize: { xs: "18px", sm: "20px" },
                    textAlign: "center",
                  }}
                >
                  Your visa is ready to view!
                </Typography>
              
                <Button
                  onClick={handlePrint}
                  sx={{
                    color: "white",
                    fontSize: { xs: "12px", sm: "15px" },
                    fontWeight: 600,
                    background: "#4064AE",
                    textTransform: "capitalize",
                    mt: "10px",
                    width: { xs: "100px", sm: "100px" },
                    height: "40px",
                    borderRadius: "4px",
                  }}
                >
                  Print
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
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
                  <Typography
                    sx={{ color: "#4064AE", fontSize: { xs: "18px", sm: "22px" } }}
                  >
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
                    {error && (
                      <Typography
                        sx={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                      >
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
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: "white",
                            position: "absolute",
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
          )}
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EVisaPortal;
