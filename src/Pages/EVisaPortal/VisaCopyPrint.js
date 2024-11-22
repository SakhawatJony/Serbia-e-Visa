import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Snackbar, Alert, Container } from "@mui/material";
import Header from "../Home/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { useLocation } from "react-router-dom";

const VisaCopyPrint = () => {
  const location = useLocation();
  const { data, successMessage } = location.state || {};

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (successMessage) {
      setSnackbarOpen(true);
    }
  }, [successMessage]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePrint = async () => {
    const pdfUrl = data?.imageUrl;

    if (pdfUrl) {
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Open the PDF in a new window/tab for printing
        const printWindow = window.open(blobUrl, "_blank");

        if (printWindow) {
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print(); // Trigger the print dialog after the PDF is loaded
            }, 500);
          };
        } else {
          alert("Unable to open a new window for printing. Please allow popups.");
        }
      } catch (error) {
        console.error("Error fetching or handling the PDF:", error);
        alert("Failed to fetch and handle the PDF.");
      }
    } else {
      alert("No PDF URL available to print.");
    }
  };

  return (
    <Box>
      <Header />
      <Container>
        <Box
          sx={{
            border: "1px solid #1D2D7A",
            borderRadius: "8px",
            height: "100%",
            px: { xs: "20px", sm: "50px", md: "100px" },
            mt: "20px",
            py: { xs: "20px", sm: "40px" },
          }}
        >
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
      </Container>
      <Footer />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VisaCopyPrint;
