
import React, { useState } from 'react';
import { Box, Card, CardContent, Divider, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Sidebar from '../component/Sidebar';
const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar isOpen={sidebarOpen} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleToggleSidebar}
                        sx={{ display: { md: 'none' } }} // Hide on medium and larger screens
                    >
                        <Menu />
                    </IconButton>
                </Box>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Welcome to the {user.role} panel dashboard. Here you can  view details.
                </Typography>
                <Card sx={{
                    maxWidth: 600,
                    mt: 4,
                    p: 2,
                    border: '2px solid #1976D2',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
                    bgcolor: 'background.paper'
                }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {user.role.toUpperCase()} Details
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Name:</strong> {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Role:</strong> {user.role}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};
export default Dashboard;