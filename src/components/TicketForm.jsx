import React, { useState } from "react";
import { Box, TextField, Button, FormControlLabel, Switch } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

function TicketForm({ onAdd }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);
  const [enabled, setEnabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!enabled) return;
    onAdd(task, date ? date.format('YYYY-MM-DD') : "");
    setTask("");
    setDate(null);
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={enabled} onChange={() => setEnabled((v) => !v)} />}
        label={enabled ? 'Form On' : 'Form Off'}
        sx={{ mb: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              fullWidth
              disabled={!enabled}
            />
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{ textField: { fullWidth: true, disabled: !enabled } }}
              disabled={!enabled}
            />
            <Button type="submit" variant="contained" disabled={!enabled}>
              Add Ticket
            </Button>
          </Box>
        </LocalizationProvider>
      </form>
    </>
  );
}

export default TicketForm;
