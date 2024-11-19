import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <Container>
                <Box
                    sx={{
                        background: "linear-gradient(#11063E, #1F3082)",
                        color: "#fff",
                        textAlign: { xs: "left", sm: "left" }, // Center text on small screens
                        py: { xs: 1.5, sm: 2 }, // Adjust padding on small screens
                        mt: 4,
                        px: { xs: "10px", sm: "10px" }, // Adjust padding on small screens
                    }}
                >
                    <Typography  sx={{
                            fontSize: { xs: "12px", sm: "14px", md: "15px" }, // Responsive font sizes
                            
                        }}>
                        &copy; 2012 Ministry of Foreign Affairs of Serbia. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default Footer;
