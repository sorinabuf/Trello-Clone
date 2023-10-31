"use client";

import { useAuth } from "@/contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Divider, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages.module.css";
import logo from "@/public/logo.png";

export default function Navbar() {
  const { logout, setCurrentUserId, currentUser } = useAuth();
  const router = useRouter();

  const navbarContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  };

  const underlineStyle = {
    backgroundColor: "#363F47",
  };

  const logoStyle = {
    width: "auto",
    height: "30px",
  };

  const navbarSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const boardsButtonStyle = {
    fontWeight: "700",
    color: "white",
    backgroundColor: "#282E34",
    padding: "10px 15px",
    borderRadius: "5px",
    marginLeft: "20px",
  };

  function handleLogout() {
    logout()
      .then(() => {
        router.push("/login");
        setCurrentUserId(null);
      })
      .catch((_) => {
        console.log("Logout failed.");
      });
  }

  return (
    <>
      <div style={navbarContainerStyle}>
        <div style={navbarSectionStyle}>
          <img src={logo.src} style={logoStyle} />
          <div
            style={boardsButtonStyle}
            className={styles["boards-button"]}
            onClick={() => router.push("/")}
          >
            Boards
          </div>
        </div>

        <div style={navbarSectionStyle}>
          {currentUser && (
            <Tooltip title={currentUser["email"]} arrow>
              <AccountCircleIcon sx={{ color: "white" }} />
            </Tooltip>
          )}

          <Button
            onClick={handleLogout}
            disableElevation
            disableRipple
            style={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            Logout
          </Button>
        </div>
      </div>

      <Divider style={underlineStyle} />
    </>
  );
}
