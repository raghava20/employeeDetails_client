import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailIcon from '@mui/icons-material/Mail';
import { useFormik } from "formik"
import * as yup from "yup"
import API_URL from './API_URL'
import { Link, useNavigate } from 'react-router-dom';
import Google from './Google';

export default function Login() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState("")
    const [serverError, setServerError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values) => {
        console.log(values, "formik")
        const userData = {
            email: values.email,
            password: values.password
        }
        try {
            const response = await API_URL.post('/login', userData)
            setErrors(response.data.message)
            setLoading(true)
            localStorage.setItem('token', response.data.token)

            if (response.data.role !== "employee") {
                return navigate('/employee-details')
            }
            navigate('/form')
        }
        catch (error) {
            setServerError(error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email').required("Please enter your email"),
            password: yup.string().required("Please enter your password!")
        }),
        onSubmit
    })

    return (
        <Grid container style={{ marginTop: 25 }} justifyContent="center" alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm direction="column" justifyContent="center" textAlign="center">
                <Typography variant="h4" sx={{ my: 3 }}>
                    Login
                </Typography>

                <form noValidate onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>

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

                    <Typography variant="subtitle" sx={{ textAlign: "end", textDecoration: 'none' }}>
                        <Link to='/forgot-password' >Forgot Password?</Link>
                    </Typography>

                    {serverError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {serverError}
                        </Typography>
                    )}

                    {errors && (
                        <Typography variant="body2" sx={{ color: 'success.main' }}>
                            {errors}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        Login
                    </Button>
                    <Typography sx={{ width: '100%', display: "flex", justifyContent: "center" }}  >
                        <Google />
                    </Typography>

                    <br />
                </form>

                <small >
                    Don't have an account ? sign up <Link to="/signup">here</Link>
                </small>
                <small style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "40px", color: "primary", flexWrap: "wrap", flexDirection: "column" }}>
                    Demo Credentials:&nbsp;
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: "3px", flexDirection: "row" }}>
                        <MailIcon color="primary" fontSize="small" />
                        test@gmail.com<br />
                    </div>
                    <div>
                        <sub><LockOpenIcon color="primary" fontSize="small" /></sub>password
                    </div>

                </small>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
