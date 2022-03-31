import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import API_URL from './API_URL';

export default function EmployeeDetails() {
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        getDataFromDb()
    }, [])

    const getDataFromDb = async () => {
        const response = await API_URL.get('/employee-details')
        console.log(response.data.response)
        setRows(response.data.response)
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


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column}
                                    style={{ minWidth: column.minWidth }}
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
    };
    return (
        <> {value !== undefined ?
            <>
                {value}
            </>
            :
            <>
                <Button onClick={() => {
                    setOpen(!open)
                    handleEdit(row._id)
                }
                }>Edit</Button>
                <Button onClick={() => handleDelete(row._id)}>Delete</Button>
            </>}


            {open ?

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <TextField name="firstName" value={inputs.firstName} onChange={handleChange} />
                        <TextField name="lastName" value={inputs.lastName} onChange={handleChange} />
                        <TextField name="gender" value={inputs.gender} onChange={handleChange} />
                        <TextField name="dateOfBirth" value={inputs.dateOfBirth} onChange={handleChange} />
                        <TextField name="address" value={inputs.address} onChange={handleChange} />
                        <TextField name="email" value={inputs.email} onChange={handleChange} />
                        <TextField name="contactNumber" value={inputs.contactNumber} onChange={handleChange} />
                        <TextField name="maritalStatus" value={inputs.maritalStatus} onChange={handleChange} />
                        <TextField name="jobTitle" value={inputs.jobTitle} onChange={handleChange} />
                        <TextField name="department" value={inputs.department} onChange={handleChange} />
                        <TextField name="bankDetails" value={inputs.bankDetails} onChange={handleChange} />

                        <Button onClick={() => handleUpdate(inputs._id)}>Submit</Button>
                    </Box>

                </Modal>

                : ""
            }</>
    )
}