import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const login = async () => {
        setErrorMsg("");
        try {
           await context.authenticate(userName, password);
        } catch (e) {
            setErrorMsg(e?.message || "Login failed");
        }
    };

    let location = useLocation();

    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#000000", backgroundImage: `
      radial-gradient(circle at top left, #1397e4ff, transparent 50%),
      radial-gradient(circle at bottom right, #1397e4ff, transparent 50%)
    `, height: '100vh' }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }} elevation={3}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                log in to your account.
            </Typography>
             <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {errorMsg && (
          <Typography variant="body2" color="error">
            {errorMsg}
          </Typography>
        )}

        <Button variant="contained" onClick={login}>
          Log in
        </Button>

        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.62)" }}>
          Not registered?{" "}
          <Link to="/signup" style={{ color: "#1397e4ff" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Paper>
  </Box>
);
};

export default LoginPage;
