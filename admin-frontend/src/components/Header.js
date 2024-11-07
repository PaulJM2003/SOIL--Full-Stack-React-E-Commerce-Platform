import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/users">User Management</Button>
                {/* <Button color="inherit" component={Link} to="/products">Product Management</Button> */}
                <Button color="inherit" component={Link} to="/reviews">Review Moderation</Button>
                {/* <Button color="inherit" component={Link} to="/settings">Settings</Button>
                <Button color="inherit" component={Link} to="/logout">Logout</Button> */}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
