import React, { useState } from "react";
import { Container, List, ListItem, Divider } from "@material-ui/core";

const Account = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Container maxWidth='md' style={{ display: "flex" }}>
      <List>
        <ListItem button>
          <Link to='/account/view'>View Profile</Link>
        </ListItem>
        <ListItem button>
          <Link to='/account/edit'>Edit Profile</Link>
        </ListItem>
        <ListItem button>
          <Link to='/account/friends'>Add friends</Link>
        </ListItem>
      </List>
      <Divider orientation='vertical' flexItem />
    </Container>
  );
};

export default Account;
