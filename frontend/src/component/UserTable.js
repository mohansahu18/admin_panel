import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, TablePagination, Box, Typography
} from '@mui/material';

const UserTable = ({ users, onEdit, onDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setPage(0);
    }, [searchTerm, users]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box>
            <TextField
                label="Search"
                variant="outlined"
                sx={{ sm: { width: "100%" }, }}
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user) => (
                                    <TableRow key={user?._id}>
                                        <TableCell>{`${user?.firstName} ${user?.lastName}`}</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                        <TableCell>{user?.role}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => onEdit(user)}>Edit</Button>
                                            <Button onClick={() => onDelete(user._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1">
                                        No data found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {filteredUsers.length > 0 && (
                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[8]}
                />
            )}
        </Box>
    );
};

export default UserTable;