import { Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddStudent = () => {
    const history = useHistory();
    const [checked, setChecked] = useState(true);
    const [label, setLabel] = useState('Active');

    // handle checkbox
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked === false){
            setLabel('inActive');
        }
        else{
            setLabel('Active');
        }
      };

      // handle Submit

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const student = {
            fullName: data.get('fullName'),
            roll: data.get('roll'),
            age: data.get('age'),
            class: data.get('class'),
            hall: data.get('hall'),
            status: checked
        };
        postToServer(student);
    };

    const postToServer = (student) => {
        fetch('https://frozen-woodland-52666.herokuapp.com/addstudent', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(item => console.log(item));
        changeLocation();
    }

    const changeLocation = () => {
        history.push('/students-list')
    }
    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 5 }}>
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
                    Add New Student
                </Typography>
                <Box component="form" onSubmit={handleSubmit} id="formAddFood" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="fullName"
                                name="fullName"
                                label="Student Name"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="roll"
                                name="roll"
                                label="Roll"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="age"
                                name="age"
                                label="Age"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="class"
                                name="class"
                                label="Class"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="hall"
                                name="hall"
                                label="Hall"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} label={label} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>Add this Student</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default AddStudent;