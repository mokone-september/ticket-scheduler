import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

function TicketForm({ onAdd }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(task, date ? date.format('YYYY-MM-DD') : "");
    setTask("");
    setDate(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <Button type="submit" variant="contained">
            Add Ticket
          </Button>
        </Box>
      </LocalizationProvider>
    </form>
  );
}

export default TicketForm;
