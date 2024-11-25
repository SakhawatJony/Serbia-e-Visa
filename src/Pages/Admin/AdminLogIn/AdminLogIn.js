import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";



const AdminLogIn = () => {
  const [adminInfo, setAdminInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false); // To track login success state

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({
      ...adminInfo,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;
    let errors = { email: "", password: "" };

    if (!adminInfo.email) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!adminInfo.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({ email: "", password: "" });

    const requestBody = {
      email: adminInfo.email,
      password: adminInfo.password,
    };

    try {
      const response = await fetch(
        "https://flyitsearch-backend-api-539319089408.asia-east1.run.app/auth/signInAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (data?.message === "Invalid password") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Invalid password",
          }));
        } else {
          
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
   

      // Navigate to the admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ height: "100vh" }}>
   
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: "100px",
        }}
      >
        <Box
          sx={{
            bgcolor: "#E0E2E3",
            width: "50%",
            px: "30px",
            py: "30px",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ py: "20px" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1B1B59",
              }}
            >
              Admin Sign In
            </Typography>

            <form onSubmit={handleAdminLogin}>
              <Box sx={{ pt: "20px" }}>
                {/* Email input */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pt: "20px",
                    gap: "20px",
                    borderBottom: "1px solid #1B1B59",
                  }}
                >
                  <MailIcon sx={{ color: "#1B1B59" }} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontSize: "12px", color: "var(--icons-color)" }}
                    >
                      Email
                    </Typography>
                    <input
                      placeholder="example@gmail.com"
                      type="email"
                      name="email"
                      value={adminInfo?.email}
                      onChange={handleInputChange}
                      style={{
                        border: "none",
                        outline: "none",
                        color: "black",
                        paddingTop: "5px",
                        paddingBottom: "8px",
                        background:"none"
                      }}
                    />
                  </Box>
                  {errors.email && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>
                      {errors.email}
                    </Typography>
                  )}
                </Box>

                {/* Password input */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pt: "20px",
                    gap: "20px",
                    borderBottom: "1px solid #1B1B59",
                  }}
                >
                  <LockIcon sx={{ color: "#1B1B59" }} />
                  <Box
                    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                  >
                    <Typography
                      sx={{ fontSize: "12px", color: "var(--icons-color)" }}
                    >
                      Password
                    </Typography>
                    <input
                      placeholder="**********"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={adminInfo?.password}
                      onChange={handleInputChange}
                      style={{
                        border: "none",
                        outline: "none",
                        color: "black",
                        paddingTop: "5px",
                        paddingBottom: "8px",
                        width: "100%",
                        background:"none"
                      }}
                    />
                  </Box>
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff sx={{color:"#1B1B59"}} /> : <Visibility sx={{color:"#1B1B59"}} />}
                  </IconButton>
                </Box>
                {errors.password && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.password}
                  </Typography>
                )}

                {/* Sign In button */}
                <Button
                  type="submit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#1B1B59",
                    mt: "20px",
                    width: "100%",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    height: "40px",
                    color: "white",
                    ":hover": {
                      bgcolor: "#1B1B59",
                      color: "white",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Admin Login"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>

   
    </Box>
  );
};

export default AdminLogIn;
