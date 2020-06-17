import React, { useContext, Fragment } from "react";
import FriendContext from "../../../context/friend/friendContext";
import { Card, CardHeader, CardContent } from "@material-ui/core";
const FriendDisplay = () => {
  const fc = useContext(FriendContext);
  const { searchuser } = fc;

  return (
    <Fragment>
      {searchuser !== null && (
        <Card>
          <CardHeader primary={searchuser.name} />
          <CardContent>{searchuser.email}</CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export default FriendDisplay;
