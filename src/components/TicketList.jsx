import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useTicketStore from "../store/useTicketStore";

function TicketList({ tickets }) {
  const deleteTicket = useTicketStore((state) => state.deleteTicket);

  return (
    <List>
      {tickets.map((t) => (
        <ListItem
          key={t.id}
          divider
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTicket(t.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={t.task} secondary={t.date} />
        </ListItem>
      ))}
    </List>
  );
}

export default TicketList;
