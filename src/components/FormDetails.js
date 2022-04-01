import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import * as yup from "yup"
import { useFormik } from "formik"

import API_URL from "./API_URL"
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/material.css'

export default function FormDetails() {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        email: "",
        contactNumber: "",
        maritalStatus: "",
        jobTitle: "",
        department: "",
        bankDetails: ""
    })
    const [currentStep, setCurrentStep] = useState(0)

    const makeRequest = async (data) => {
        const response = await API_URL.post('/employee-details', data)
        if (response.data.message === "Posted Successfully") {
            return navigate('/employee-details')
        }

    }

    const handleNextStep = (newInput, final = false) => {
        setInputs(prev => ({ ...prev, ...newInput }))

        if (final) {
            makeRequest(newInput)
            return
        }
        setCurrentStep(prev => prev + 1)
    }

    const handlePreviousStep = (newInput) => {
        setInputs(prev => ({ ...prev, ...newInput }))

        setCurrentStep(prev => prev - 1)
    }

    const steps = [
        <StepOne next={handleNextStep} inputs={inputs} />,
        <StepTwo next={handleNextStep} previous={handlePreviousStep} inputs={inputs} />,
        <StepThree next={handleNextStep} previous={handlePreviousStep} inputs={inputs} />
    ]

    return (
        <Box sx={{ width: "60%", m: "auto" }}>
            {steps[currentStep]}
        </Box>
    )
}


const StepOne = ({ inputs, next }) => {

    const onSubmit = (values) => {
        next(values)
    }

    const stepOneValidationSchema = yup.object({
        firstName: yup.string().required().label('First Name'),
        lastName: yup.string().required().label('Last Name'),
        gender: yup.string().required().label('Gender'),
        dateOfBirth: yup.string().required().label('Date of Birth')
    })

    const formik = useFormik({
        initialValues: inputs,
        validationSchema: stepOneValidationSchema,
        onSubmit
    })


    return (
        <form onSubmit={formik.handleSubmit} style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <TextField type="text" label="First Name" name="firstName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName} variant="outlined" error={formik.touched.firstName && formik.errors.firstName ? true : false} helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ""} />
            <TextField type="text" label="Last Name" name="lastName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} variant="outlined" error={formik.touched.lastName && formik.errors.lastName ? true : false} helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ""} />
            <FormControl error={formik.touched.gender && formik.errors.gender ? true : false} >
                <FormLabel >Gender</FormLabel>
                <RadioGroup row name="gender" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender} >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                <FormHelperText>{formik.touched.gender && formik.errors.gender ? formik.errors.gender : ""}</FormHelperText>

            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="D.O.B"
                    name="dateOfBirth"
                    onChange={val => formik.setFieldValue("dateOfBirth", val)}
                    value={formik.values.dateOfBirth}
                    renderInput={(params) => <TextField {...params}
                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ""}
                        onBlur={formik.handleBlur}
                        error={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? true : false} />}
                />
            </LocalizationProvider>

            <div style={{ textAlign: 'end' }}><Button variant="contained" color="secondary" type="submit">Next</Button></div>
        </form>
    )
}


const StepTwo = ({ inputs, next, previous }) => {

    const onSubmit = (values) => {
        next(values)
    }


    const stepTwoValidationSchema = yup.object({
        address: yup.string().required().label('Address'),
        email: yup.string().required().email().label('Email'),
        contactNumber: yup.string().required().label("Phone"),
        maritalStatus: yup.string().required().label('Marital Status')
    })

    const formik = useFormik({
        initialValues: inputs,
        validationSchema: stepTwoValidationSchema,
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <TextField label="Address" variant="outlined" name="address" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address} error={formik.touched.address && formik.errors.address ? true : false} helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ""} />
            <TextField label="Email" type="email" variant="outlined" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} error={formik.touched.email && formik.errors.email ? true : false} helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""} />
            {/* <TextField
                label="Contact No."
                variant="outlined"
                name="contactNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.contactNumber}
                error={formik.touched.contactNumber && formik.errors.contactNumber ? true : false}
                helperText={formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : ""}

            /> */}
            <PhoneInput
                label="Contact No."
                country={"in"}
                enableAreaCodes={true}
                autoFormat={true}
                value={formik.values.contactNumber}
                inputStyle={{ width: '100%' }}
                inputProps={{
                    name: 'contactNumber',
                    label: "Contact No.",
                    type: 'tel',
                    onBlur: formik.handleBlur,
                    onChange: formik.handleChange,
                    error: formik.touched.contactNumber && formik.errors.contactNumber ? true : false,
                    helperText: formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : ""
                }}
            />
            <FormHelperText sx={{ color: "error.main" }}>{formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : ""}</FormHelperText>

            <FormControl error={formik.touched.maritalStatus && formik.errors.maritalStatus ? true : false}>
                <FormLabel>Marital Status</FormLabel>
                <RadioGroup row name="maritalStatus" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.maritalStatus}  >
                    <FormControlLabel value="married" control={<Radio />} label="Married" />
                    <FormControlLabel value="unMarried" control={<Radio />} label="Unmarried" />
                </RadioGroup>
                <FormHelperText>{formik.touched.maritalStatus && formik.errors.maritalStatus ? formik.errors.maritalStatus : ""}</FormHelperText>
            </FormControl>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" type="button" onClick={() => previous(formik.values)}>previous</Button>
                <Button variant="contained" color="secondary" type="submit">Next</Button>
            </div>
        </form>
    )
}


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StepThree = ({ inputs, next, previous }) => {

    const [getData, setGetData] = useState([])
    const [modal, setModal] = useState(false)
    const [addValue, setAddValue] = useState("")
    const [open, setOpen] = useState(false);
    const [serverError, setServerError] = useState("")

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    useEffect(() => {
        getDataFromDb()
    }, [])

    const getDataFromDb = async () => {
        try {
            const response = await API_URL.get('/employee-details/departments/details')
            setGetData(response.data.response)
            console.log(response, "datafrom the db")
            console.log(getData, "datafrom the db")
        }
        catch (error) {
            console.log(error.response)
        }
    }

    const handleCreateDepartment = async () => {
        const userData = {
            department: addValue
        }
        try {
            const response = await API_URL.post('/employee-details/departments', userData)
            setServerError(response.data.message)
            handleClick()
            setModal(!modal)
            setAddValue("")
            console.log(response.data.message)
            getDataFromDb()
        }
        catch (error) {
            setServerError(error.response.data.message)
            console.log(error.response.data.message)
            handleClick()
        }

    }

    const onSubmit = (values) => {
        next(values, true)
    }


    const stepThreeValidationSchema = yup.object({
        jobTitle: yup.string().required().label("Job Title"),
        department: yup.string().required().label('Department'),
        bankDetails: yup.string().required().label("Bank Details")
    })


    const formik = useFormik({
        initialValues: inputs,
        validationSchema: stepThreeValidationSchema,
        onSubmit
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <form onSubmit={formik.handleSubmit} style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <TextField type="text" label="Job Title" variant="outlined" name="jobTitle" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.jobTitle} error={formik.touched.jobTitle && formik.errors.jobTitle ? true : false} helperText={formik.touched.jobTitle && formik.errors.jobTitle ? formik.errors.jobTitle : ""} />

            <FormControl fullWidth error={formik.touched.department && formik.errors.department ? true : false}>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Department"
                    name="department"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.department}
                >

                    {getData.map(data => <MenuItem value={data.department}>{data.department}</MenuItem>)}
                    <Button onClick={() => setModal(!modal)}>Add</Button>
                </Select>
                <FormHelperText>{formik.touched.department && formik.errors.department ? formik.errors.department : ""}</FormHelperText>
            </FormControl>

            <Modal
                open={modal}
                onClose={() => setModal(!modal)}
            >
                <Box sx={style}>
                    <TextField value={addValue} onChange={(e) => setAddValue(e.target.value)} />
                    <Button onClick={handleCreateDepartment}>Submit</Button>
                </Box>
            </Modal>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={serverError === "Added department" ? "success" : "error"} sx={{ width: '100%' }}>
                    {serverError}
                </Alert>
            </Snackbar>

            <TextField type="text" label="Bank Details" helperText={formik.touched.bankDetails && formik.errors.bankDetails ? formik.errors.bankDetails : 'Account no,Branch,IFSC Code'} variant="outlined" name="bankDetails" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bankDetails} error={formik.touched.bankDetails && formik.errors.bankDetails ? true : false} />
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" type="button" onClick={() => previous(formik.values)}>previous</Button>
                <Button variant="contained" color="secondary" type="submit">Submit</Button>
            </div>
        </form>
    )
}