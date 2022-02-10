import React from 'react';
import { Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const Distribution = () => {
    const [student, setStudent] = useState([]);
    const [studentRoll, setStudentRoll] = useState('');
    const [shift, setShift] = useState('');
    const [date, setDate] = useState(new Date().toLocaleString());
    const [status, setStatus] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [foodItems, setFoodItems] = useState([]);


    const handleChange = (event) => {
        const roll = event.target.value;
        setStudentRoll(roll);
        fetch(`http://localhost:5000/stu/${roll}`)
            .then(res => res.json())
            .then(data => setStudent(data));

    }
    const handleShiftChange = (event) => {
        setShift(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleChange1 = (event) => {
        setChecked1(event.target.checked);
        if(event.target.checked === true){
            foodItems.push('Alu Vorta')
        }
    };

    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
        if(event.target.checked === true){
            foodItems.push('Mach Vorta')
        }
    };

    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
        if(event.target.checked === true){
            foodItems.push('Korolla Vaji')
        }
    };

    const distribution = {name: student.name, studentId: student.roll, shift: shift, status: status, foodItemsList: foodItems};
    const handleClick = () => {
        fetch('http://localhost:5000/addDistribution', {
            method: 'POST',
            body: JSON.stringify(distribution),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(item => console.log(item));
    }
    return (
        <Container sx={{ width: '500px', margin: '0 auto' }}>
            <Box sx={{ maxWidth: 260 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Roll</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={studentRoll}
                        label="Roll"
                        onChange={handleChange}
                    >
                        <MenuItem value={136805}>136805</MenuItem>
                        <MenuItem value={163261}>163261</MenuItem>
                        <MenuItem value={200113}>200113</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ maxWidth: 260, mt: 1 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-2">Shift</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-2"
                        id="demo-simple-select-2"
                        value={shift}
                        label="Shift"
                        onChange={handleShiftChange}
                    >
                        <MenuItem value={'Morning'}>Morning</MenuItem>
                        <MenuItem value={'Afternoon'}>Afternoon</MenuItem>
                        <MenuItem value={'Evening'}>Evening</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ maxWidth: 300, mt: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Selcet Date"
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate.toLocaleString());
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Box sx={{ maxWidth: 260, mt: 1 }}>
                <FormControl fullWidth>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status2"
                        value={status}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={'served'}>served</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ maxWidth: 260, mt: 2 }}>
                <FormControlLabel control={<Checkbox checked={checked1} onChange={handleChange1}/>} label={'Alu Vorta'} />
                <FormControlLabel control={<Checkbox checked={checked2} onChange={handleChange2}/>} label={'Mach Vorta'} />
                <FormControlLabel control={<Checkbox checked={checked3} onChange={handleChange3}/>} label={'Korolla Vaji'} />     
            </Box>
            <Box sx={{ maxWidth: 260, mt: 3 }}>
                <Button variant="contained" sx={{ mt: 1, mb: 2 }} onClick={handleClick} fullWidth>Done</Button>
            </Box>
        </Container>
    );
};

export default Distribution;