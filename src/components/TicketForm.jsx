import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function TicketForm({ onAdd }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !date) return;
    onAdd(task, date);
    setTask("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained">
          Add Ticket
        </Button>
      </Box>
    </form>
  );
}

export default TicketForm;
