import { Alert, Box, Container, Snackbar, Typography } from "@mui/material";
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

        // Automatically trigger print on page load
        handlePrint();
    }, [successMessage]); // Ensure handlePrint is defined before useEffect

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const handlePrint = async () => {
        const pdfUrl = data?.imageUrl;

        if (pdfUrl) {
            try {
                const response = await fetch(pdfUrl);
                if (!response.ok) throw new Error("Failed to fetch PDF");

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                if (isMobile) {
                    window.open(blobUrl, "_blank"); // Mobile fallback
                } else {
                    const iframe = iframeRef.current;
                    if (iframe) {
                        iframe.src = blobUrl; // Load blob into iframe
                        iframe.onload = () => {
                            setTimeout(() => {
                                iframe.contentWindow?.print(); // Trigger print dialog
                            }, 500); // Wait for iframe to load
                        };
                    }
                }
            } catch (error) {
                console.error("Error fetching or printing PDF:", error);
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
                        px: { xs: "20px", sm: "50px", md: "100px" },
                        mt: "20px",
                        py: { xs: "20px", sm: "40px" },
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
                        Your visa is being printed...
                    </Typography>
                </Box>
            </Container>
            <Footer />

            {/* Hidden iframe for desktop printing */}
            <iframe
                ref={iframeRef}
                style={{
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px",
                    width: "0px",
                    height: "0px",
                    border: "none",
                }}
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
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VisaCopyPrint;
