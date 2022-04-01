import { Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import API_URL from './API_URL';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EmployeeDetails() {
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [getData, setGetData] = useState([])
    const [dataHolder, setDataHolder] = useState([])

    useEffect(() => {
        getDataFromDb()
    }, [])

    const getDataFromDb = async () => {
        const response = await API_URL.get('/employee-details')
        const details = await API_URL.get('/employee-details/departments/details')
        console.log(response.data.response)
        setRows(response.data.response)
        setDataHolder(response.data.response)
        setGetData(details.data.response)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: "First Name", value: "firstName" },
        { id: "Last Name", value: "lastName" },
        { id: "Gender", value: "gender" },
        { id: "D.O.B", value: "dateOfBirth" },
        { id: "Address", value: "address" },
        { id: "Email", value: "email" },
        { id: "Contact No.", value: "contactNumber" },
        { id: "Marital Status", value: "maritalStatus" },
        { id: "Job Title", value: "jobTitle" },
        { id: "Department", value: "department" },
        { id: "Bank Details", value: "bankDetails" },
        { id: "Options", value: "nodat34f!a" }
    ];

    const handleDataProvider = (e) => {
        console.log(e.target.innerText)
        // getDataFromDb()
        if (e.target.innerText !== "All") {
            const value = dataHolder.filter(row => row.department === e.target.innerText);
            return setRows(value);
        }
        getDataFromDb()

    }
    return (
        <Paper sx={{ width: '100%', p: 2 }}>
            <FormControl sx={{ width: '13%', mt: 2 }}>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Department"
                    name="department"
                >
                    <MenuItem value="All" onClick={(e) => handleDataProvider(e)}>All</MenuItem>
                    {getData.map(data => <MenuItem key={data.department} value={data.department} onClick={(e) => handleDataProvider(e)}>{data.department}</MenuItem>)}
                </Select>
            </FormControl>
            <TableContainer sx={{ maxHeight: 440, mt: 3 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column}
                                    style={{ minWidth: column.minWidth, backgroundColor: 'black', color: 'white' }}

                                >
                                    {column.id}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.firstName}>
                                        {columns.map((column) => {
                                            let value = row[column.value]
                                            if (column.value === "dateOfBirth") {
                                                value = format(new Date(value), "MM/dd/yyyy")
                                            }
                                            return (
                                                <>
                                                    {
                                                        <TableCell key={row._id} >

                                                            <Modals value={value} getDataFromDb={getDataFromDb} row={row} columns={columns} />

                                                        </TableCell>
                                                    }
                                                </>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
    )
}


const Modals = ({ value, row, getDataFromDb, columns }) => {
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState([])

    const handleDelete = async (id) => {
        await API_URL.delete('/employee-details/' + id)
        getDataFromDb()
    }
    const handleEdit = async (id) => {
        const response = await API_URL.get('/employee-details/' + id)
        setInputs(response.data.response)
    }
    const handleClose = () => setOpen(false);

    const handleUpdate = async (id) => {
        console.log(inputs)
        const response = await API_URL.put('/employee-details/' + id, inputs)
        console.log(response, "sss")

        setOpen(false)
        getDataFromDb()
    }

    const handleChange = (event) => {
        setInputs(input => ({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

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
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    };
    return (
        <> {value !== undefined ?
            <>
                {value}
            </>
            :
            <>
                <IconButton onClick={() => {
                    setOpen(!open)
                    handleEdit(row._id)
                }}
                    style={{ color: "#2a9f01" }}
                ><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(row._id)} style={{ color: "#c41010" }}><DeleteIcon /></IconButton>
            </>}


            {open ?

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style} >
                        <Typography sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="First Name" name="firstName" value={inputs.firstName} onChange={handleChange} />
                            <TextField label="Last Name" name="lastName" value={inputs.lastName} onChange={handleChange} />
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="Gender" name="gender" value={inputs.gender} onChange={handleChange} />
                            <TextField label="D.O.B" name="dateOfBirth" value={inputs.dateOfBirth} onChange={handleChange} />
                        </Typography>
                        <TextField label="Address" name="address" value={inputs.address} onChange={handleChange} />
                        <TextField label="Email" name="email" value={inputs.email} onChange={handleChange} />
                        <Typography sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="Contact No." name="contactNumber" value={inputs.contactNumber} onChange={handleChange} />
                            <TextField label="Marital Status" name="maritalStatus" value={inputs.maritalStatus} onChange={handleChange} />
                        </Typography>

                        <TextField label="Job Title" name="jobTitle" value={inputs.jobTitle} onChange={handleChange} />
                        <TextField label="Department" name="department" value={inputs.department} onChange={handleChange} />
                        <TextField label="Bank Details " name="bankDetails" value={inputs.bankDetails} onChange={handleChange} />

                        <Button onClick={() => handleUpdate(inputs._id)}>Submit</Button>
                    </Box>

                </Modal>

                : ""
            }</>
    )
}