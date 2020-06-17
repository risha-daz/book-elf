import React, { Fragment, useState } from "react";
import {
  ListItem,
  List,
  Divider,
  Drawer,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const Settings = () => {
  const [open, setopen] = useState(false);
  const toggleSettings = () => {
    setopen(!open);
  };
  return (
    <Fragment>
      <IconButton color='inherit' onClick={toggleSettings}>
        <Icon>menu</Icon>
      </IconButton>
      <Drawer
        anchor='left'
        open={open}
        variant='temporary'
        onClose={toggleSettings}
      >
        <List component='nav'>
          <ListItem button>
            <ListItemIcon>
              <Icon>note_add</Icon>
            </ListItemIcon>
            <ListItemText primary='New Recommendation' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon>filter_alt</Icon>
            </ListItemIcon>
            <ListItemText primary='Detailed Filter' />
          </ListItem>

          <Divider />
          <Link to='/account/view'>
            <ListItem button>
              <ListItemIcon>
                <Icon>portrait</Icon>
              </ListItemIcon>
              <ListItemText primary='View Profile' />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <i className='fas fa-user-edit' />
            </ListItemIcon>
            <ListItemText primary='Edit Profile' />
          </ListItem>
          <Link to='/account/friends'>
            <ListItem button>
              <ListItemIcon>
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary='Add Friends' />
            </ListItem>
          </Link>

          <Divider />
          <ListItem button>
            <ListItemIcon>
              <i className='fas fa-sign-out-alt' />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
};

export default Settings;
