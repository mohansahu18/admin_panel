
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Dashboard, People, ExitToApp } from '@mui/icons-material';

const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Box
            sx={{
                bgcolor: { xs: '#1976d2', md: 'gray.800' },
                color: 'black',
                width: 256, // 64px * 4 to match the w-64 class
                height: '100vh',
                py: 3.5, // 7px * 2 to match py-7
                px: 1, // 2px * 2 to match px-2
                position: { xs: 'fixed', md: 'relative' },
                left: 0,
                top: 0,
                transition: 'transform 0.2s ease-in-out',
                transform: {
                    xs: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    md: 'translateX(0)'
                },
                zIndex: 1200,
                '& .MuiListItemButton-root': {
                    mb: 3, // To match space-y-6
                },
                '& .MuiListItemIcon-root': {
                    minWidth: 40,
                },
            }}
            className="bg-gray-800 text-white"
        >
            <nav>
                <List>
                    <ListItemButton component={Link} to="/dashboard">
                        <ListItemIcon>
                            <Dashboard className="text-white" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    {
                        user.role === "admin" && (
                            <ListItemButton component={Link} to="/admin/users">
                                <ListItemIcon>
                                    <People className="text-white" />
                                </ListItemIcon>
                                <ListItemText primary="User Management" />
                            </ListItemButton>

                        )
                    }
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToApp className="text-white" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </List>
            </nav>
        </Box>
    );
};

export default Sidebar;