import React, { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);

  const addTicket = (task, date) => {
    setTickets([...tickets, { task, date }]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎟 Ticket Scheduler
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <TicketForm onAdd={addTicket} />
      </Paper>

      <Typography variant="h6" gutterBottom>
        Scheduled Tickets
      </Typography>
      <TicketList tickets={tickets} />
    </Container>
  );
}

export default App;
