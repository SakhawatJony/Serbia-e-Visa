import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { RiVisaFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const EVisaPortal = () => {
    return (
        <Box>


            {/* Main Content */}
            <Container
            >
                <Box sx={{
                    border: '1px solid #1D2D7A',
                    borderRadius: '8px',
                    height: "400px",
                    px: "100px",
                    py: "30px"
                }}>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <Box sx={{ bgcolor: "#4064AE", height: "45px", width: "45px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Box>
                                <RiVisaFill style={{ color: "white", fontSize: "25px" }} />
                            </Box>
                        </Box>
                        <Box sx={{ borderBottom: "1px solid #4064AE", width: "100%", }}>
                            <Typography sx={{ color: "#4064AE", fontSize: "22px" }}>Portal of Serbia e-Visa</Typography>


                        </Box>
                    </Box>
                    <Box sx={{ mt: "25px " }}>
                        <form>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <label style={{ color: "black", fontSize: "15px" }}>
                                    <span style={{ color: "red", paddingRight: "5px" }}>*</span> e-Visa ID
                                </label>
                                <input placeholder='Enter ID here' style={{ paddingLeft: "10px", fontSize: "15px", width: "200px", marginTop: "10px", height: "26px", outline: "none", border: "1px solid grey", }} />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end",mt:"50px" }}>
                                <Button sx={{
                                    background: "rgb(111 172 68)", color: "white", ":hover": {
                                        background: "#FEFEFD", color: "#4064AE",
                                        border: "1px solid #4064AE",
                                    }
                                    , textTransform: "capitalize",
                                    borderRadius: "none", width: "150px",
                                height:"40px"
                                }}>
                                    Confirm <IoIosArrowForward />
                                </Button>
                            </Box>

                        </form>
                    </Box>


                </Box>




            </Container>

        </Box>
    )
}

export default EVisaPortal
