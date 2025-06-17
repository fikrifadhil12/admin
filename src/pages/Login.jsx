// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Di aplikasi nyata, verifikasi harus dilakukan di backend
      if (credentials.password === "admin123") {
        localStorage.setItem("admin", "true");
        navigate("/dashboard");
      } else {
        setError("Email atau password salah");
      }
    } catch (err) {
      setError("Login gagal. Silakan coba lagi.");
      console.error("Error login:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <LockIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h5" component="h1" sx={{ mt: 1 }}>
            Admin Login
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
