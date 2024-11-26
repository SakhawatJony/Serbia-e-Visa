import { Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "#19164F",
          mt: "200px",
          fontSize: "30px",
          fontWeight: 600,
        }}
      >
        {" "}
        Welcome to My Portal of Serbia e-Visa
      </Typography>
    </div>
  );
};

export default Dashboard;
