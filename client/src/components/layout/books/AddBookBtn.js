import React from "react";
import { Fab, Icon } from "@material-ui/core";

const AddBookBtn = ({ handleClickOpen }) => {
  return (
    <div>
      <Fab color='primary' onClick={handleClickOpen}>
        <Icon>add</Icon>
      </Fab>
    </div>
  );
};

export default AddBookBtn;
