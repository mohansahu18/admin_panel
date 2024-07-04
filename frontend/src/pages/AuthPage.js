import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import Login from './Login';
import Register from './Register';
import { useDispatch } from 'react-redux';
import { registerFailure } from '../redux/slice/authSlice';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch()
    const toggleAuth = () => {
        setIsLogin(!isLogin);
        dispatch(registerFailure(null));
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {isLogin ? 'Login' : 'Register'}
            </Typography>
            {isLogin ? <Login /> : <Register />}
            <Box sx={{ mt: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={toggleAuth}
                >
                    {isLogin ? 'Switch to Register (Admin)' : 'Switch to Login'}
                </Button>
            </Box>
        </Container>
    );
};

export default AuthPage;