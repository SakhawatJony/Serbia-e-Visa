import React, { useState } from "react";
import { Box, Button, Container, Snackbar, Typography, Alert, CircularProgress } from "@mui/material";
import { RiVisaFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const EVisaPortal = () => {
  const [visaID, setVisaID] = useState(""); // e-Visa ID input
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message
  const [loading, setLoading] = useState(false); // Loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
  const [pdfUrl, setPdfUrl] = useState(""); // PDF URL received from backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visaID) {
      setError("e-Visa ID is required!");
      setSuccess("");
      setSnackbarOpen(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://your-backend-api.com/pdf/${visaID}`);

      if (!response.ok) {
        throw new Error("Visa not found!");
      }

      const data = await response.json();
      setPdfUrl(data?.pdfUrl); // URL of the PDF to be printed
      setError("");
      setSuccess("Visa retrieved successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message || "An error occurred!");
      setSuccess("");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (pdfUrl) {
      // Create an embed tag and append it to the body to trigger print
      const embed = document.createElement("embed");
      embed.style.position = "absolute";
      embed.style.width = "0px";
      embed.style.height = "0px";
      embed.style.border = "none";
      embed.src = pdfUrl;
      embed.type = "application/pdf";

      document.body.appendChild(embed);

      // Trigger the print dialog
      window.print();
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
        <Box sx={{ border: "1px solid #1D2D7A", borderRadius: "8px", height: { xs: "auto", sm: "350px" }, px: { xs: "20px", sm: "100px" }, mt: "20px", py: "30px" }}>
          {pdfUrl ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Typography sx={{ color: "black", fontWeight: 600, fontSize: { xs: "18px", sm: "20px" }, textAlign: "center" }}>
                  Your visa is ready to print!
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
                <Box sx={{ bgcolor: "#4064AE", height: "45px", width: "45px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                        width: "200px",
                        marginTop: "10px",
                        height: "26px",
                        outline: "none",
                        border: "1px solid grey",
                      }}
                    />
                    {error && (
                      <Typography sx={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                        {error}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: "50px" }}>
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
                        <CircularProgress size={24} sx={{ color: "white", position: "absolute" }} />
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

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EVisaPortal;
