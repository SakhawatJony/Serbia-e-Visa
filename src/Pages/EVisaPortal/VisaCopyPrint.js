import { Alert, Box, Button, Container, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "../Home/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { useLocation } from "react-router-dom";

const VisaCopyPrint = () => {
    const location = useLocation();
    const { data, successMessage } = location.state || {};
    const iframeRef = useRef(null);

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

                const iframe = iframeRef.current;
                if (iframe) {
                    iframe.src = blobUrl;
                    iframe.onload = () => {
                        iframe.contentWindow.print(); 
                    };
                }
            } catch (error) {
                console.error("Error fetching PDF:", error);
                alert("Failed to fetch and print the PDF.");
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
                        px: { xs: "20px", sm: "50px", md: "100px" }, // Responsive padding
                        mt: "20px",
                        py: { xs: "20px", sm: "40px" }, // Responsive padding for small screens
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
                                fontSize: { xs: "18px", sm: "20px" }, // Responsive font size
                                textAlign: "center", // Center text on smaller screens
                            }}
                        >
                            Your visa is ready to view!
                        </Typography>
                        <Button
                            onClick={handlePrint}
                            sx={{
                                color: "white",
                                fontSize: { xs: "12px", sm: "15px" }, // Adjust font size for small screens
                                fontWeight: 600,
                                background: "#4064AE",
                                textTransform: "capitalize",
                                mt: "10px",
                                width: { xs: "100px", sm: "100px" }, // Full width on mobile, fixed on larger screens
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

            {/* Hidden iframe for printing */}
            <iframe
                ref={iframeRef}
                style={{ display: "none" }}
                title="Print Frame"
            />

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
                    {successMessage} {/* Show the success message */}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VisaCopyPrint;
