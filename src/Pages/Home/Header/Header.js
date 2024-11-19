import { Box, Container } from '@mui/material';
import React from 'react';
import imgbg from "../../../assest/header (1).jpg";

const Header = () => {
    return (
        <div>
            {/* Header */}
            <Container>
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: "auto", sm: "100%", md: "100%" }, // Responsive height
                        overflow: "hidden", // To prevent image overflow
                    }}
                >
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // Ensure the image covers the area without distortion
                        }}
                        src={imgbg}
                        alt="Header Image"
                    />
                </Box>
            </Container>
        </div>
    );
};

export default Header;
