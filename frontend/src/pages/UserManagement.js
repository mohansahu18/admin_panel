import React, { useState, useEffect } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, IconButton, CircularProgress } from '@mui/material';
import { Menu } from '@mui/icons-material';


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UserTable from '../component/UserTable';
import { getUsers, deleteUser, createUser, updateUser } from '../services/apiService';
import Sidebar from '../component/Sidebar';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    role: Yup.string().oneOf(['user', 'admin'], 'Invalid role')
});

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsers();
            setUsers(response.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (user = null) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            if (selectedUser) {
                await updateUser(selectedUser._id, values);
            } else {
                await createUser(values);
            }
            fetchUsers();
            handleCloseDialog();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
            setSubmitting(false);
            setOpenDialog(false);
        }
    };

    const handleEdit = (user) => {
        handleOpenDialog(user);
    };

    const handleDelete = async (userId) => {
        setLoading(true);
        try {
            await deleteUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar isOpen={sidebarOpen} />
            <Box sx={{ width: "100%", bgcolor: '#F4F6F8', }}>
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
                <Typography variant="h4" >
                    User Management
                </Typography>
                <Button onClick={() => handleOpenDialog()} variant="contained" color="warning" className="mb-4">
                    Add User
                </Button>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                    <Formik
                        initialValues={{
                            firstName: selectedUser?.firstName || '',
                            lastName: selectedUser?.lastName || '',
                            email: selectedUser?.email || '',
                            password: '',
                            role: selectedUser?.role || 'user'
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <DialogContent>
                                    <Field
                                        as={TextField}
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        margin="normal"
                                        error={touched.firstName && errors.firstName}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                    <Field
                                        as={TextField}
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        margin="normal"
                                        error={touched.lastName && errors.lastName}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        margin="normal"
                                        error={touched.email && errors.email}
                                        helperText={touched.email && errors.email}
                                    />
                                    <Field
                                        as={TextField}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        error={touched.password && errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                    <Field
                                        as={TextField}
                                        name="role"
                                        label="Role"
                                        fullWidth
                                        margin="normal"
                                        disabled
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} disabled={isSubmitting}>Cancel</Button>
                                    <Button type="submit" color="primary" disabled={isSubmitting}>
                                        {isSubmitting ? <CircularProgress size={24} /> : (selectedUser ? 'Update' : 'Add')}
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            </Box>
        </Box>
    );
};

export default UserManagement;