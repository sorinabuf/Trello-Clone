"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authStyles from "@/styles/auth.module.css";
import pageStyles from "@/styles/pages.module.css";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const confirm_password = data.get("confirm_password")?.toString();

    if (!email || !password || !confirm_password) {
      setError("Email and password are required.");
      return;
    }

    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to register. Please try again.");
    }

    setLoading(false);
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
            Sign Up
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
              {" "}
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
              sx={{ input: { color: "#B6C2CF" } }}
            />

            <Typography
              variant="subtitle2"
              className={pageStyles.header}
              style={{ marginTop: "20px" }}
            >
              {" "}
              Repeat Password <span className={pageStyles["red-span"]}>*</span>
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="current-password"
              placeholder="Reenter your password"
              sx={{ input: { color: "#B6C2CF" }, marginBottom: "20px" }}
            />

            <Link href="/login" style={{ color: "#1976D2" }}>
              Already have an account? Sign In
            </Link>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{ mt: 8, mb: 2 }}
              disabled={loading}
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
