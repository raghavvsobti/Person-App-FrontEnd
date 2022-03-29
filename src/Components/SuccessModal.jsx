import {
  Dialog,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@material-ui/core";
import PropTypes from "prop-types";

import React from "react";

const SuccessModal = ({ successOpen, closeHandler, message }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      TransitionComponent={Transition}
      open={successOpen}
      keepMounted
      onClose={closeHandler}
      fullWidth
      size="md"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
        <DialogContentText id="alert-dialog-slide-description">
          <b>{message}</b>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeHandler} fullWidth variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
SuccessModal.propTypes = {
  successOpen: PropTypes.bool,
  closeHandler: PropTypes.func,
  message: PropTypes.string,
};
export default SuccessModal;
