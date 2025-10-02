import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import useTicketStore from "../store/useTicketStore";

function TicketList({ tickets }) {
  const deleteTicket = useTicketStore((state) => state.deleteTicket);
  const updateTicket = useTicketStore((state) => state.updateTicket);

  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setEditTask(ticket.task);
    setEditDate(ticket.date);
  };

  const handleSave = (id) => {
    updateTicket(id, editTask, editDate);
    setEditingId(null);
  };

  return (
    <List>
      {tickets.map((ticket) => (
        <ListItem
          key={ticket.id}
          sx={{ bgcolor: "white", borderRadius: 1, mb: 1 }}
        >
          {editingId === ticket.id ? (
            <>
              <TextField
                size="small"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                sx={{ mr: 1 }}
              />
              <TextField
                type="date"
                size="small"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => handleSave(ticket.id)}
              >
                <SaveIcon />
              </Button>
            </>
          ) : (
            <>
              <ListItemText
                primary={ticket.task}
                secondary={ticket.date}
              />
              <IconButton onClick={() => handleEdit(ticket)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTicket(ticket.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default TicketList;
