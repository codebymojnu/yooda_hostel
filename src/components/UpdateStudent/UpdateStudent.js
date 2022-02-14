import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const UpdateStudent = () => {
    const history = useHistory();
    const [student, setStudent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/student/${id}`)
            .then(res => res.json())
            .then(data => setStudent(data));

    }, [id])

    const handleNameChange = e => {
        const updateName = e.target.value;
        const updateStudent = { fullName: updateName, roll: student.roll, age: student.age, class: student.class, hall: student.hall };
        setStudent(updateStudent);
    }

    const handleRollChange = e => {
        const roll = e.target.value;
        const updateStudent = { fullName: student.name, roll: roll, age: student.age, class: student.class, hall: student.hall };
        setStudent(updateStudent);
    }

    const handleAgeChange = e => {
        const age = e.target.value;
        const updateStudent = { fullName: student.name, roll: student.roll, age: age, class: student.class, hall: student.hall };
        setStudent(updateStudent);
    }

    const handleClassChange = e => {
        const class2 = e.target.value;
        const updateStudent = { fullName: student.name, roll: student.roll, age: student.age, class: class2, hall: student.hall };
        setStudent(updateStudent);
    }

    const handleHallChange = e => {
        const hall = e.target.value;
        const updateStudent = { fullName: student.name, roll: student.roll, age: student.age, class: student.class, hall: hall };
        setStudent(updateStudent);
    }

    const handleUpdate = () => {
        const url = `http://localhost:5000/update-student/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Successfully updated 1 food item');
                }
            })
            history.push('/students-list');
    };
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 10 }}>
            <Typography variant="h6" gutterBottom>
                Update student details
            </Typography>
            <Box component="form" onSubmit={() => handleUpdate()} id="formAddFood" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="fullName"
                            name="fullName"
                            onChange={handleNameChange}
                            value={student.fullName || ''}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="roll"
                            name="roll"
                            onChange={handleRollChange}
                            value={student.roll || ''}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="age"
                            name="age"
                            onChange={handleAgeChange}
                            value={student.age || ''}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="class"
                            name="class"
                            onChange={handleClassChange}
                            value={student.class || ''}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="hall"
                            name="hall"
                            onChange={handleHallChange}
                            value={student.hall || ''}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>Update this item</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UpdateStudent;