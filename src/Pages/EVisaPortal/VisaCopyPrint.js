import { Alert, Box, Button, Container, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Home/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { useLocation } from "react-router-dom";

const VisaCopyPrint = () => {
    const location = useLocation();
    const { data, successMessage } = location.state || {};

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        if (successMessage) {
            setSnackbarOpen(true);
        }

        // Detect if the device is mobile
        const checkMobileView = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        checkMobileView();
        window.addEventListener("resize", checkMobileView);

        return () => {
            window.removeEventListener("resize", checkMobileView);
        };
    }, [successMessage]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handlePrint = () => {
        const pdfUrl = data?.imageUrl;

        if (!pdfUrl) {
            alert("No PDF URL available.");
            return;
        }

        // Create a new window for the PDF
        const printWindow = window.open(pdfUrl, "_blank"); // Open the PDF in a new tab

        if (!printWindow) {
            alert("Popup blocked! Please allow popups for this website.");
            return;
        }

        printWindow.onload = () => {
            // Attempt to trigger the print dialog once the PDF is loaded
            printWindow.print();
        };
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
                                width: { xs: "100px", sm: "150px" },
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
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VisaCopyPrint;
