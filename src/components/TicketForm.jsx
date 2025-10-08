import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Paper,
  Typography,
  Collapse,
  Alert,
  Chip,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

function TicketForm({ onAdd }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [errors, setErrors] = useState({ task: false, date: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_TASK_LENGTH = 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enabled) return;

    // Validate inputs
    const newErrors = {
      task: !task.trim(),
      date: !date,
    };
    setErrors(newErrors);

    // If there are errors, don't submit
    if (newErrors.task || newErrors.date) {
      return;
    }

    // Simulate async operation (if needed)
    setIsSubmitting(true);
    
    try {
      await onAdd(task.trim(), date.format("YYYY-MM-DD"));
      
      // Reset form on success
      setTask("");
      setDate(null);
      setErrors({ task: false, date: false });
    } catch (error) {
      console.error("Error adding ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTaskChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_TASK_LENGTH) {
      setTask(value);
      if (errors.task && value.trim()) {
        setErrors({ ...errors, task: false });
      }
    }
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
    if (errors.date && newValue) {
      setErrors({ ...errors, date: false });
    }
  };

  const isFormValid = task.trim() && date;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 2,
      }}
    >
      {/* Form Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="600">
          {enabled ? "Add New Ticket" : "Form Disabled"}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={() => setEnabled((v) => !v)}
              color="primary"
            />
          }
          label={
            <Chip
              label={enabled ? "Enabled" : "Disabled"}
              color={enabled ? "success" : "default"}
              size="small"
            />
          }
        />
      </Box>

      {/* Form Content */}
      <Collapse in={enabled}>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" flexDirection="column" gap={2.5}>
              {/* Task Input */}
              <TextField
                label="Task Name"
                value={task}
                onChange={handleTaskChange}
                fullWidth
                disabled={!enabled || isSubmitting}
                error={errors.task}
                helperText={
                  errors.task
                    ? "Task name is required"
                    : `${task.length}/${MAX_TASK_LENGTH} characters`
                }
                placeholder="Enter task description..."
                variant="outlined"
                autoComplete="off"
                inputProps={{
                  maxLength: MAX_TASK_LENGTH,
                }}
              />

              {/* Date Picker */}
              <DatePicker
                label="Due Date"
                value={date}
                onChange={handleDateChange}
                disabled={!enabled || isSubmitting}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    disabled: !enabled || isSubmitting,
                    error: errors.date,
                    helperText: errors.date
                      ? "Please select a date"
                      : "Select when this task is due",
                  },
                }}
              />

              {/* Info Alert */}
              {isFormValid && (
                <Alert severity="info" sx={{ py: 0.5 }}>
                  Ready to add: <strong>{task}</strong> on{" "}
                  <strong>{date.format("MMM DD, YYYY")}</strong>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={!enabled || isSubmitting || !isFormValid}
                size="large"
                startIcon={<AddIcon />}
                sx={{
                  py: 1.5,
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {isSubmitting ? "Adding..." : "Add Ticket"}
              </Button>
            </Box>
          </LocalizationProvider>
        </form>
      </Collapse>

      {/* Disabled State Message */}
      {!enabled && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Form is currently disabled. Enable it to add new tickets.
        </Alert>
      )}
    </Paper>
  );
}

export default TicketForm;