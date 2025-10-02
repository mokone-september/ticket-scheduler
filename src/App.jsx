import React, { useState } from "react";
import { Container, Typography, Paper, Snackbar, Alert } from "@mui/material";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import useTicketStore from "./store/useTicketStore";


function App() {
  const tickets = useTicketStore((state) => state.tickets);
  const addTicket = useTicketStore((state) => state.addTicket);
  // const clearTickets = useTicketStore((state) => state.clearTickets);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleAddTicket = (task, date) => {
    if (!task || !date) {
      setError(true);
      return;
    }
    addTicket(task, date);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setError(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        🎟 Ticket Scheduler
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <TicketForm onAdd={handleAddTicket} />
      </Paper>

      <Typography variant="h6" gutterBottom>
        Scheduled Tickets
      </Typography>
      <TicketList tickets={tickets} />

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Ticket added successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Please fill in all fields.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
