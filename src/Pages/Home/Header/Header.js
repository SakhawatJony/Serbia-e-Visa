import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import imgbg from "../../../assest/header (1).jpg"

const Header = () => {
    const backgroundStyle = {
        backgroundImage: `url(${imgbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '300px', // Adjust height as needed
        width: '100%', // Ensure the container spans the full width
    };
    return (
        <div>
            {/* Header */}
            <Container>
                <Box sx={{width:"100%"}}>
                    <img style={{width:"100%",height:"100%"}} src={imgbg} />
                </Box>
            </Container>
        </div>
    )
}

export default Header
