import React from "react";
import SearchFriends from "../../layout/social/SearchFriends";
import { Container } from "@material-ui/core";
import FriendDisplay from "../../layout/social/FriendDisplay";
const AddFriends = () => {
  return (
    <Container maxWidth='md' align='center' p={5}>
      <SearchFriends />
      <FriendDisplay />
    </Container>
  );
};

export default AddFriends;
