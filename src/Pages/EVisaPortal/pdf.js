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

    const embedHtml = `
        <html>
            <body style="margin: 0; padding: 0;">
                <embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%">
            </body>
        </html>
    `;

    const printWindow = window.open("", "_self"); // Open in the same tab
    printWindow.document.write(embedHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
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

                    {/* If mobile, embed the PDF directly on the page */}
                    {isMobileView && (
                        <Box sx={{ marginTop: "20px", width: "100%", height: "500px" }}>
                            <iframe
                                id="pdfIframe"
                                src=""
                                width="100%"
                                height="100%"
                                style={{ border: "none" }}
                            />
                        </Box>
                    )}
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
