import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import useTicketStore from "../store/useTicketStore";
import dayjs from "dayjs";

function TicketList({ tickets }) {
  const deleteTicket = useTicketStore((state) => state.deleteTicket);
  const updateTicket = useTicketStore((state) => state.updateTicket);
  const showNotification = useTicketStore((state) => state.showNotification);

  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDate, setEditDate] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Handle edit mode
  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setEditTask(ticket.task);
    setEditDate(ticket.date);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditTask("");
    setEditDate("");
  };

  // Save edited ticket
  const handleSave = (id) => {
    if (!editTask.trim()) {
      showNotification("Task name cannot be empty", "error");
      return;
    }
    if (!editDate) {
      showNotification("Please select a date", "error");
      return;
    }
    updateTicket(id, editTask, editDate);
    setEditingId(null);
    showNotification("Ticket updated successfully!", "success");
  };

  // Show delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  // Confirm deletion
  const handleDeleteConfirm = () => {
    deleteTicket(deleteConfirm);
    setDeleteConfirm(null);
    showNotification("Ticket deleted", "success");
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  // Check if date is today, past, or future
  const getDateStatus = (date) => {
    const today = dayjs().startOf("day");
    const ticketDate = dayjs(date).startOf("day");

    if (ticketDate.isSame(today)) {
      return { label: "Today", color: "primary" };
    } else if (ticketDate.isBefore(today)) {
      return { label: "Overdue", color: "error" };
    } else {
      return { label: "Upcoming", color: "success" };
    }
  };

  // Empty state
  if (tickets.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          px: 2,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          📋 No tickets yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first ticket above to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {tickets.map((ticket) => {
          const dateStatus = getDateStatus(ticket.date);

          return (
            <ListItem
              key={ticket.id}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 2,
                mb: 2,
                boxShadow: 1,
                "&:hover": {
                  boxShadow: 3,
                },
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                py: 2,
              }}
            >
              {editingId === ticket.id ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 1,
                      flex: 1,
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    <TextField
                      size="small"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      placeholder="Task name"
                      fullWidth
                      autoFocus
                    />
                    <TextField
                      type="date"
                      size="small"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      sx={{ minWidth: { sm: 150 } }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, sm: 0 } }}>
                    <Tooltip title="Save changes">
                      <IconButton
                        color="primary"
                        onClick={() => handleSave(ticket.id)}
                        size="small"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton
                        color="error"
                        onClick={handleCancel}
                        size="small"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography variant="body1" fontWeight="500">
                          {ticket.task}
                        </Typography>
                        <Chip
                          label={dateStatus.label}
                          color={dateStatus.color}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        📅 {dayjs(ticket.date).format("MMM DD, YYYY")}
                      </Typography>
                    }
                    sx={{ flex: 1 }}
                  />
                  <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, sm: 0 } }}>
                    <Tooltip title="Edit ticket">
                      <IconButton
                        onClick={() => handleEdit(ticket)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete ticket">
                      <IconButton
                        onClick={() => handleDeleteClick(ticket.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              )}
            </ListItem>
          );
        })}
      </List>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Ticket?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this ticket? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TicketList;