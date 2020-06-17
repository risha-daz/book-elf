import React, { useState, useContext } from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import FriendContext from "../../../context/friend/friendContext";

const SearchFriends = () => {
  const [searchparams, setSearch] = useState("");
  const friendContext = useContext(FriendContext);
  const { searchUser, clearSearchUser } = friendContext;
  const onSubmit = (e) => {
    e.preventDefault();
    if (searchparams !== "") {
      searchUser({ searchparams });
    } else {
      clearSearchUser();
    }
  };
  return (
    <FormControl>
      <TextField
        value={searchparams}
        type='text'
        id='search'
        placeholder='Search user by email'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <label htmlFor='search'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          onClick={onSubmit}
        >
          Search
        </Button>
      </label>
    </FormControl>
  );
};

export default SearchFriends;
