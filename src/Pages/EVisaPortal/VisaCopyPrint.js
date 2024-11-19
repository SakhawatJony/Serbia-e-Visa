import { Box, Button, Container, Typography } from "@mui/material";
import React, { useRef } from "react";
import Header from "../Home/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { useLocation } from "react-router-dom";

const VisaCopyPrint = () => {
    const location = useLocation();
    const data = location?.state;
    const iframeRef = useRef(null);

    console.log("Received data:", data?.imageUrl);

    const handlePrint = async () => {
        const pdfUrl = data?.imageUrl;
    
        if (pdfUrl) {
            try {
                const response = await fetch(pdfUrl);
                if (!response.ok) throw new Error("Failed to fetch PDF");
    
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
    
                // Load the blob URL into an iframe
                const iframe = iframeRef.current;
                if (iframe) {
                    iframe.src = blobUrl;
                    iframe.onload = () => {
                        iframe.contentWindow.print(); // Trigger print
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
                        px: "100px",
                        mt: "20px",
                        py: "40px",
                    }}
                >
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
                                    fontSize: "20px",
                                }}
                            >
                                Your visa is ready to view!
                            </Typography>
                            <Button
                                onClick={handlePrint}
                                sx={{
                                    color: "white",
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    background: "#4064AE",
                                    textTransform: "capitalize",
                                    mt: "10px",
                                    width: "100px",
                                    height: "40px",
                                }}
                            >
                                Print
                            </Button>
                        </Box>
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
        </Box>
    );
};

export default VisaCopyPrint;
