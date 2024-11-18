import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <Container>
                <Box
                    sx={{
                        background: "linear-gradient(#11063E, #1F3082)",
                        color: "#fff",
                        textAlign: "left",
                        py: 2,
                        mt: 4,
                        px:"10px"
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
