"use client";

import { useAuth } from "@/contexts/AuthContext";
import { addUser } from "@/utils/data";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const { signUp, setCurrentUserId } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    });

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const confirm_password = data.get("confirm_password")?.toString();

    // Validate email and password
    if (!email || !password || !confirm_password) {
      setError("Email and password are required");
      return;
    }

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      router.push("/boards");

      addUser(email).then((res) => {
        console.log(res)
        console.log(res["user_id"])
        setCurrentUserId(res["user_id"]);

        console.log("User added to database");
      });
    } catch (error) {
      console.log(error);
      setError("Failed to register");
    }

    setLoading(false);
  }

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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Repeat Password"
              type="password"
              id="confirm_password"
              autoComplete="current-password"
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
      <Link href="/">Already have an account? Sign In</Link>
    </>
  );
}
