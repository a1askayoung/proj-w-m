import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@mui/material'
import React, { useContext } from 'react'
import { productContext } from '../context/ProductContext'

function FilterProduct() {
    const {fetchByParams}=useContext(productContext)            //? FILTRATION #4
    
    return (
    <div>
        <Paper sx={{position: 'absolute', p: 5, backgroundColor: "transparent", boxShadow: "0"}}>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="all"
                    name="radio-buttons-group"
                    onChange={(e)=>fetchByParams('category', e.target.value)}                           //? FILTRATION #5 onChange
                >
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="plants" control={<Radio />} label="Plants" />
                    <FormControlLabel value="mac" control={<Radio />} label="Mac" />
                    <FormControlLabel value="ipad" control={<Radio />} label="iPad" />
                    <FormControlLabel value="iphone" control={<Radio />} label="iPhone" />
                </RadioGroup>
            </FormControl>
        </Paper>
    </div>
  )
}

export default FilterProduct