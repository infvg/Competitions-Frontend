import { Snackbar } from "@mui/material";
import { propsToClassKey } from "@mui/styles";
import React from "react";

export default function Notification(message) {
    const [state, setState] = React.useState({
      open: true,
      vertical: 'top',
      horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    return    (
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message.name + " has ended! Modify the competition and add some winners."}
        key={vertical + horizontal}
      />
    );
}