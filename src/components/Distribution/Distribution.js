import React, { useEffect } from 'react';
import { Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import KhabarNeyaPolaPain from '../KhabarNeyaPolaPain/KhabarNeyaPolaPain';

const Distribution = () => {
    const [student, setStudent] = useState([]);
    const [allStudentData, setAllStudentData] = useState([]);
    const [studentRoll, setStudentRoll] = useState('');
    const [shift, setShift] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [status, setStatus] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [foodItems] = useState([]);

    const date1stPart = date.substring(0,1);
    const date2ndPart = date.substring(2, 4);
    const date3rdPart = date.substring(5, 9);
    const finalDate = date1stPart + "-" + date2ndPart + "-" + date3rdPart;

    useEffect(() => {
        fetch('http://localhost:5000/api/students')
        .then(res => res.json())
        .then(data => setAllStudentData(data));
    }, []);

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
        if (event.target.checked === true) {
            foodItems.push('Alu Vorta')
        }
    };

    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
        if (event.target.checked === true) {
            foodItems.push('Mach Vorta')
        }
    };

    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
        if (event.target.checked === true) {
            foodItems.push('Korolla Vaji')
        }
    };
    
    const allStudentRoll= allStudentData.map(student => student.roll);
    
    const distribution = { fullName: student.fullName, studentId: student.roll, shift: shift, status: status, foodItemsList: foodItems, date: finalDate };
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
        window.location.reload();
    }
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={4}>
                <Container sx={{ ml: 15 }}>
                    <Box sx={{ maxWidth: 260 }}>
                        <h4>Distribution Form</h4>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Roll</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={studentRoll}
                                label="Roll"
                                onChange={handleChange}
                            >
                                {
                                    allStudentRoll.map(roll =>  <MenuItem value={roll} key={roll}>{roll}</MenuItem>)
                                }
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
                                    setDate(newDate);
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
                        <FormControlLabel control={<Checkbox checked={checked1} onChange={handleChange1} />} label={'Alu Vorta'} />
                        <FormControlLabel control={<Checkbox checked={checked2} onChange={handleChange2} />} label={'Mach Vorta'} />
                        <FormControlLabel control={<Checkbox checked={checked3} onChange={handleChange3} />} label={'Korolla Vaji'} />
                    </Box>
                    <Box sx={{ maxWidth: 260, mt: 3 }}>
                        <Button variant="contained" sx={{ mt: 1, mb: 2 }} onClick={handleClick} fullWidth>Done</Button>
                    </Box>
                </Container>
            </Grid>
            <Grid item xs={12} sm={8} md={7}>
                <h4>Khabar neya pola-pan</h4>
                <KhabarNeyaPolaPain />
            </Grid>
        </Grid>
    );
};

export default Distribution;