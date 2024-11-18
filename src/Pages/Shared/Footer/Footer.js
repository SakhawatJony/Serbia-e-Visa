import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <Container>
                <Box
                    sx={{
                        backgroundColor: "#003366",
                        color: "#fff",
                        textAlign: "center",
                        py: 2,
                        mt: 4,
                    }}
                >
                    <Typography variant="body2">
                        &copy; 2012 Ministry of Foreign Affairs of Serbia. All rights reserved.
                    </Typography>
                </Box>
            </Container>

        </div>
    )
}

export default Footer
