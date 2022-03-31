import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const [auth, setAuth] = useState(false)


    const checkAuth = () => {
        if (localStorage.getItem('token')) {
            return setAuth(true)
        }
    }
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h6" color="inherit" component="div">
                        Employee Details
                    </Typography>
                    {auth ?

                        <Typography>
                            <Button type="button" variant="contained" sx={{ mr: 1 }} onClick={() => navigate('/form')}>Form</Button>
                            <Button type="button" variant="contained" sx={{ mr: 1 }} onClick={() => navigate('/employee-details')}>Details</Button>
                            <Button type="button" variant="contained" onClick={() => {
                                localStorage.removeItem('token')
                                setAuth(false)
                                return navigate('/login')
                            }}>
                                Logout
                            </Button>
                        </Typography>
                        :
                        <Typography>
                            <Button type="button" color="inherit" sx={{ mr: 1 }} onClick={() => navigate('/login')}>Login</Button>
                            <Button type="button" variant="contained" onClick={() => navigate('/signup')}>Signup</Button>
                        </Typography>

                    }
                </Toolbar>
            </AppBar>
        </Box >
    )
}
