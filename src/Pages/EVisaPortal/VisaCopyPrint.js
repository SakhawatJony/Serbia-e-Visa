import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { RiVisaFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Header from '../Home/Header/Header';
import Footer from '../Shared/Footer/Footer';

const VisaCopyPrint = () => {
    const handlePrint = () => {
        window.print(); // Trigger the browser's print functionality
    };
    return (
        <Box>
            <Header />
            {/* Main Content */}
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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            <Typography sx={{ color: "black", fontWeight: 600,fontSize:"20px" }}>Your visa is ready to view!</Typography>
                            <Button onClick={handlePrint} sx={{ color: "white", fontSize: "15px", fontWeight: 600, background: "#4064AE", textTransform: "capitalize",mt:"10px", width: "100px", height: "40px" }}>
                                Print
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />

            {/* Snackbar Component */}

        </Box>
    )
}

export default VisaCopyPrint
