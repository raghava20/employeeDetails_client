import React, { useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import API_URL from './API_URL'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function ForgotPassword() {


    const [errors, setErrors] = useState("")
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        console.log(values, "formik")
        const userData = {
            email: values.email
        }
        try {
            const response = await API_URL.put('/forgot-password', userData)
            console.log(response);
            if (response.data.message.includes("Reset")) {
                setLoading(true)
                setErrors(response.data.message)
            }
        }
        catch (error) {
            setServerError(error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email').required("Please enter your email!")
        }),
        onSubmit
    })

    return (
        <Grid container style={{ marginTop: 25 }} justifyContent="center" alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm direction="column" justifyContent="center" textAlign="center">
                <Typography variant="h4" sx={{ my: 3 }}>
                    Forgot Password
                </Typography>

                <form onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>

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
                        Submit
                    </Button>
                    <br />
                    <small >
                        Don't have an account ? Signup <Link to="/signup">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
