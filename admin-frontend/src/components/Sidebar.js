import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
    return (
        <Drawer variant="permanent" className="sidebar">
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/users">
                    <ListItemText primary="User Management" />
                </ListItem>
                {/* <ListItem button component={Link} to="/products">
                    <ListItemText primary="Product Management" />
                </ListItem> */}
                <ListItem button component={Link} to="/reviews">
                    <ListItemText primary="Review Moderation" />
                </ListItem>
                {/* <ListItem button component={Link} to="/settings">
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button component={Link} to="/logout">
                    <ListItemText primary="Logout" />
                </ListItem> */}
            </List>
        </Drawer>
    );
}

export default Sidebar;
