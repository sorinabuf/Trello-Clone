"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    // Validate email and password
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Failed to log in");
    }

    setLoading(false);
  }

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (currentUser?.uid) {
      router.push("/dashboard");
    }
  }, [currentUser]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Container>
      <Link href="/register">Don't have an account? Sign Up</Link>
    </>
  );
}
