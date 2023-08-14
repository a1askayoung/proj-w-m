import { Alert, Button, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'                          //! 

function Register() {
    const {authWithGoogle, register}=useAuthContext()                       //! registr with email #2
                                                                                //! auth with google #3

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')                                              //! registr with email #3

    const [error, setError]=useState('')                                        

    const handleSubmit = async (e)=>{
        try {
            await register(email, password)                                                 //! registr with email #4
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <>
        <Grid container direction="row" justifyContent="center" alignItems="center" flexDirection="column" marginTop="200px">
            {error && <Alert severity='error'>{error}</Alert>}
            <Typography sx={{fontFamily: 'Monserrat, sans-serif', letterSpacing: '2px', fontSize: '32px' }}>
                Sign up to Store
            </Typography>
            <TextField sx={{marginTop: "30px", width: "40%"}} label="email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <TextField sx={{marginTop: "30px", width: "40%"}} label="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                                                                    {/* onclick= */}
            <Button sx={{marginTop: "30px", width: "40%"}} variant="contained" onClick={handleSubmit}>Sign Up</Button>
            <Button sx={{marginTop: "30px", width: "40%"}} variant="contained" onClick={()=>authWithGoogle()}>Continue with Google</Button>
            <FormControl>
                <FormControlLabel control={<Checkbox/>} label="Remember me" sx={{marginTop: '30px'}}/>
            </FormControl>
        </Grid>
    </>
    )
}

export default Register