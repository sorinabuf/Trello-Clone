import { useAuth } from "@/contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Divider, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "@/styles/Boards.module.css";
import logo from "@/public/logo.png";

export default function Navbar() {
  const { logout, setCurrentUserId, currentUser } = useAuth();
  const router = useRouter();

  const dividerStyle = {
    backgroundColor: "#363F47",
  };

  const imgStyle = {
    width: "auto",
    height: "30px",
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  };

  const groupStyle = {
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

  async function handleLogout() {
    logout().then(() => {
        router.push("/");
        setCurrentUserId(null);
      }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <div style={navbarStyle}>
        <div style={groupStyle}>
          <img src={logo.src} style={imgStyle} />
          <div
            style={boardsButtonStyle}
            className={styles["boards-button"]}
            onClick={() => router.push("/boards")}
          >
            Boards
          </div>
        </div>

        <div style={groupStyle}>
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

      <Divider style={dividerStyle} />
    </>
  );
}
