"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authStyles from "@/styles/auth.module.css";
import pageStyles from "@/styles/pages.module.css";

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to login. Please try again.");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="sm"
        className={authStyles["card-container"]}
      >
        <Box className={authStyles["form-container"]}>
          <Typography variant="h5" className={pageStyles.header}>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="subtitle2" className={pageStyles.header}>
              Email address <span className={pageStyles["red-span"]}>*</span>
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Enter your email address"
              sx={{ input: { color: "#B6C2CF" } }}
            />

            <Typography
              variant="subtitle2"
              className={pageStyles.header}
              style={{ marginTop: "20px" }}
            >
              Password <span className={pageStyles["red-span"]}>*</span>
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              sx={{ input: { color: "#B6C2CF" }, marginBottom: "20px" }}
            />

            <Link href="/register" style={{ color: "#1976D2" }}>
              Don't have an account? Sign Up
            </Link>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{ mt: 8, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>

            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Container>
    </>
  );
}
