import React, { useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import API_URL from './API_URL'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function Signup() {
    const [errors, setErrors] = useState("")
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const onSubmit = async (values) => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        try {
            const response = await API_URL.post('/signup', userData)
            console.log(response)
            setErrors(response.data.message)
            setLoading(true)
        }
        catch (error) {
            setServerError(error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Please enter your name!"),
            email: yup.string().email('Invalid email').required("Please enter your email!"),
            password: yup.string().required("Please enter your password!").min(6)
        }),
        onSubmit
    })

    return (
        <Grid container style={{ marginTop: 25 }} justifyContent="center" alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm direction="column" justifyContent="center" textAlign="center">
                <Typography variant="h4" sx={{ my: 3 }}>
                    Signup
                </Typography>

                <form noValidate onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>


                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                        error={formik.touched.name && formik.errors.name ? true : false}
                    />

                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        error={formik.touched.email && formik.errors.email ? true : false}
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        error={formik.touched.password && formik.errors.password ? true : false}
                    />

                    {errors && (
                        <Typography variant="body2" sx={{ color: 'success.main' }}>
                            {errors}
                        </Typography>
                    )}

                    {serverError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {serverError}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        Signup
                    </Button>
                    <br />
                    <small >
                        Already have an account ? Login <Link to="/login">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
