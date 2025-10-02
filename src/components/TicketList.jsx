import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

function TicketList({ tickets }) {
  return (
    <List>
      {tickets.map((t, i) => (
        <ListItem key={i} divider>
          <ListItemText primary={t.task} secondary={t.date} />
        </ListItem>
      ))}
    </List>
  );
}

export default TicketList;
