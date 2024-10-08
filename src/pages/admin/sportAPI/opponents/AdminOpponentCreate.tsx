import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { useActions } from "../../../../hooks/useActions";
import { useNavigate } from 'react-router-dom';
import { Modal } from "bootstrap"
import { http } from "../../../../http"
import AdmNavbar from "../../AdmNavbar";

const SportOpponentCreate = () => {
  const [sportMatches, setSportMatches] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    loadSportEvents();
  }, []);
  const loadSportEvents = () => {
  
    http.get("api/SportMatch/get")
      .then(resp => {
        const {payload} = resp.data;

        setSportMatches(payload);
        console.log(payload);
      });
  }
  const [opponent, setOpponent] = useState({
    name: '',
    sportMatchId: ''
  });

  const isFormValid = () => {
    return Object.values(opponent);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submit: "+ opponent)
    http.post("api/Opponent/create", opponent)
      .then(() => {
        navigate('/admin/sport/opponents');
      });
    
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h1>Create Opponent</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Sport Match name"
          name="name"
          value={opponent.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          style={{ marginBottom: 10 }}
          required
        />       
        <FormControl variant="outlined" fullWidth style={{ marginBottom: 10 }}>
          <InputLabel>ParentId</InputLabel>
          <Select name="sportMatchId" id="sportMatchId" value={opponent.sportMatchId} onChange={handleChange}>
            {sportMatches?.map((sportMatch:any) => (
              <MenuItem key={sportMatch.id} value={sportMatch.id}>
                {sportMatch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>       
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
          disabled={!isFormValid()}
        >
          Create Opponent
        </Button>
      </form>
    </Paper>
    
  );
};

export default SportOpponentCreate;
