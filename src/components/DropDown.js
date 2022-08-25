import React from 'react'
import { tickerSub } from '../helpers/fetchData'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

let DropDown = ({setTicker}) => {
    const changeSub = (t) => {
        setTicker(t)
        tickerSub(t)
    }
    return (
        <FormControl id="dropDown" fullWidth>
            <InputLabel id="choose-ticker">Choose a Ticker</InputLabel>
            <Select
                labelId="choose-ticker"
                onChange={(e) => {changeSub(e.target.value)}}
            >
                <MenuItem value="BTC-USD">BTC-USD</MenuItem>
                <MenuItem value="ETH-USD">ETH-USD</MenuItem>
                <MenuItem value="LTC-USD">LTC-USD</MenuItem>
                <MenuItem value="BCH-USD">BCH-USD</MenuItem>
            </Select>
        </FormControl>
        // <form> 
        //     <select onChange={e =>((changeSub(e.target.value)))}>
        //         <option disabled selected value> -- select an option -- </option>
        //         <option value="BTC-USD">BTC-USD</option>
        //         <option value="ETH-USD">ETH-USD</option>
        //         <option value="LTC-USD">LTC-USD</option>
        //         <option value="BCH-USD">BCH-USD</option>
        //     </select>
        // </form>
    )
}

export default DropDown