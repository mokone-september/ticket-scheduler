import React from "react";
import { Paper, Box, TextField, Button } from "@mui/material";

function TicketForm({ task, date, setTask, setDate, addTicket }) {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullWidth
        />
        <TextField
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={addTicket}>
          Add Ticket
        </Button>
      </Box>
    </Paper>
  );
}

export default TicketForm;
