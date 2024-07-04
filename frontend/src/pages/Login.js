import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slice/authSlice';
import { login as loginApi } from '../services/apiService';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.auth);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        dispatch(loginStart());
        try {
            const response = await loginApi(values);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            navigate("/dashboard");
            dispatch(loginSuccess(response));
        } catch (error) {
            dispatch(loginFailure(error.message));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <Field
                        as={TextField}
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        name="password"
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </Form>
            )}
        </Formik>
    );
};

export default Login;