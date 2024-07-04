import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../redux/slice/authSlice';
import { register as registerApi } from '../services/apiService';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Register = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };
    const navigate = useNavigate()
    const handleSubmit = async (values, { setSubmitting }) => {
        dispatch(registerStart());
        try {
            const data = await registerApi(values);
            dispatch(registerSuccess(data));
            navigate("/")
            // Handle successful registration (e.g., redirect, show message)
        } catch (error) {
            dispatch(registerFailure(error.message));
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
                        margin="normal"
                        fullWidth
                        label="First Name"
                        name="firstName"
                        error={touched.firstName && errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                    />
                    <Field
                        as={TextField}
                        margin="normal"
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        error={touched.lastName && errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                    />
                    <Field
                        as={TextField}
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        name="email"
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <Field
                        as={TextField}
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading || isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        {(loading || isSubmitting) ? <CircularProgress size={24} color="inherit" /> : 'Admin Register'}
                    </Button>
                    {error && (
                        <Typography color="error" align="center" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default Register;