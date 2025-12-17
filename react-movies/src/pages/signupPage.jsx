import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Box, Paper, TextField, Typography, Button } from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  
  const register = async () => {
    setErrorMsg("");
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setErrorMsg("Password must be at least 8 characters and include a letter, number, and symbol.");
      return;
    }
    if (password !== passwordAgain) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    try {
      let result = await context.register(userName, password);
      if (result) setRegistered(true);
      else setErrorMsg("Signup failed (username may already exist).");
   }  catch (e) {
      setErrorMsg(e.message || "Signup failed.");
  }
};

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#000000", backgroundImage: `
      radial-gradient(circle at top left, rgba(5, 211, 247, 0.53), transparent 50%),
      radial-gradient(circle at top right, rgba(5, 211, 247, 0.53), transparent 50%)
    `, height: '100vh' }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }} elevation={3}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Create an account. Password must be 8+ chars and include a letter, number, and symbol.
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

        <TextField
          label="Confirm password"
          type="password"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          fullWidth
        />

        {errorMsg && (
          <Typography variant="body2" color="error">
            {errorMsg}
          </Typography>
        )}

        <Button variant="contained" onClick={register}>
          Register
        </Button>
      </Box>
      </Paper>

    </Box>
  );
};


export default SignUpPage;
