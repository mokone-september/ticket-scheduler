import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const addTicket = () => {
    if (!task || !date) return;
    setTickets([...tickets, { task, date }]);
    setTask("");
    setDate("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎟 Ticket Scheduler
      </Typography>

      <TicketForm
        task={task}
        date={date}
        setTask={setTask}
        setDate={setDate}
        addTicket={addTicket}
      />

      <Typography variant="h6">Scheduled Tickets</Typography>
      <TicketList tickets={tickets} />
    </Container>
  );
}

export default App;
