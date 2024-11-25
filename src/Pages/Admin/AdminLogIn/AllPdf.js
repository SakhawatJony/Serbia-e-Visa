import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AllPdf = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("adminToken");


    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch("https://pdf-project-mauve.vercel.app/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRows(data); // Assume the API returns an array of objects
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <Box sx={{ px: "100px", pt: "100px" }}>
            <Box sx={{textAlign:"right"}}>
                <Link to="/admin/allnew">
                <Button sx={{
                    background: "green", color: "white", textTransform: "capitalize", ":hover": {
                        background: "green", color: "white",

                    }
                }}>Add New</Button>
                </Link>
                
            </Box>
            <TableContainer component={Paper} sx={{mt:"10px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#19164F", color: "white" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: 600, }}>Si No</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600, }}>Visa Id</TableCell>
                            <TableCell align="right" sx={{ color: "white", fontWeight: 600, }}>View Pdf</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row?.id}
                                </TableCell>
                                <TableCell >{row?.trackNum}</TableCell>
                                <TableCell align="right"><a href={row?.imageUrl} target='_blank' style={{ background: "#19164F", color: "white", padding: "10px", cursor: "pointer", borderRadius: "5px" }}>View</a></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AllPdf
