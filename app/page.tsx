"use client";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import Boards from "@/components/Boards";
import ProtectedRoute from "@/components/ProtectedRoute";
import styles from "@/styles/pages.module.css";

const HomePage = () => {
  const pageMargin = {
    margin: "20px",
  };

  return (
    <>
      <Navbar />

      <Typography
        variant="h6"
        gutterBottom
        className={styles.header}
        style={pageMargin}
      >
        My Boards
      </Typography>

      <div style={pageMargin}>
        <Grid container spacing={4}>
          <Boards />
        </Grid>
      </div>
    </>
  );
};

export default ProtectedRoute(HomePage);
