import { Checkbox, Container, FormControlLabel, FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import StudentsRow from '../StudentsRow/StudentsRow';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/students')
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);

    // handle selectAll checkbox
    const handleSelectAll = (e) => {
        const newStudents = [];
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const updateStudent = {...student};
            updateStudent.status = e.target.checked;
            setChecked(e.target.checked)
            const url = `http://localhost:5000/update-status/${students[i]._id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({status: e.target.checked})
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        console.log('Successfully updated');
                    }
                })
            newStudents.push(updateStudent);
        }
        
        alert('Are you sure select all');
        window.location.reload();
        setStudents(newStudents);
    }

    return (
        <Container>
        <TableContainer>
            <h4 style={{ textAlign: 'center', marginTop: '40px' }}>Students List</h4>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Roll</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell><Box component="form">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={checked}/>} label={'Selcect All'} onChange={handleSelectAll}/>
                    </FormGroup>
                </Box></TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((row, index) => 
                        <StudentsRow key={index} row={row} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    );
};

export default StudentsTable;