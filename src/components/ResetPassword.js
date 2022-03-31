import React, { useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import API_URL from './API_URL'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function ResetPassword() {
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const onSubmit = async (values) => {
        console.log(values, "formik")
        const userData = {
            password: values.password,
            resetLink: id
        }

        try {
            const response = await API_URL.put('/reset-password', userData)
            console.log(response);
            if (response.data.message.includes("Password")) {
                setLoading(true)
                setErrors(response.data.message)
            }
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            password: yup.string().required("Please enter your password!").min(6),
            confirmPassword: yup.string().required("Please confirm your password!").when("password", {
                is: val => val && val.length > 0 ? true : false,
                then: yup.string().oneOf([yup.ref("password")], "Password does not match!")
            })
        }),
        onSubmit
    })
    return (
        <Grid container style={{ marginTop: 25 }} justifyContent="center" alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm direction="column" justifyContent="center" textAlign="center">
                <Typography variant="h4" sx={{ my: 3 }}>
                    Reset Password
                </Typography>

                <form noValidate onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>

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
                    <TextField
                        id="password"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                    />

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
                        Reset
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
