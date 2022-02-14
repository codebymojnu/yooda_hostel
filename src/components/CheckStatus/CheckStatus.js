import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";

const CheckStatus = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [value, setValue] = useState(null);
    const [shift, setShift] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [student, setStudent] = useState([]);

    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const date1stPart = date.substring(0, 1);
    const date2ndPart = date.substring(2, 4);
    const date3rdPart = date.substring(5, 9);

    // Modal Style
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

    const finalDate = date1stPart + "-" + date2ndPart + "-" + date3rdPart;

    console.log(student);
    useEffect(() => {
        fetch('http://localhost:5000/api/students')
            .then(res => res.json())
            .then(data => setStudentsData(data));
    }, []);

    const handleShiftChange = (event) => {
        setShift(event.target.value);
    }
    const options = studentsData.map(student => student.roll);

    const handleClick = () => {
        fetch(`http://localhost:5000/khaowaPolapan/${value}/${shift}/${finalDate}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data);
            });
        handleOpen(); 
    }

    return (
        <Stack spacing={2} sx={{ width: 300, margin: '0 auto' }}>
            <Autocomplete
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue(newValue)
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue(
                            newValue.inputValue
                        );
                    } else {
                        setValue(newValue);
                    }
                }}
                id="free-solo-demo"
                freeSolo
                options={options}
                renderInput={(params) => <TextField {...params} label="Enter a Roll" />}
            />
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Selcet Date"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate.toLocaleDateString());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant="contained" sx={{ mt: 1, mb: 2 }} onClick={handleClick} fullWidth>Check</Button>

            

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {student[0]?.fullName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        status: {student[0]?.status}
                    </Typography>
                    {
                        !student.length?<p>Not Serve Yet</p>:''
                    }
                </Box>
            </Modal>
        </Stack>
    );
}

export default CheckStatus;
