"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const correctPassword = "TA08";

    if (password === correctPassword) {
      router.push("/home");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e3f2fd, #bbdefb)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: 350,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          Enter Password To Visit Our Website
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.2,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
