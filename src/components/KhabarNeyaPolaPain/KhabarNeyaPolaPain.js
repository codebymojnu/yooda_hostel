import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KhaowaPolaPain from './KhaowaPolapin';
 
const KhabarNeyaPolaPain = () => {
    const [KhaowaPolaPains, setKhaowaPolaPains] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/khaowaStudent')
        .then(res => res.json())
        .then(data => setKhaowaPolaPains(data))
    }, [])
    return (
        <Container>
            <p>Data filter with {new Date().toLocaleString().substring(0, 9)}</p>
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Roll</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>foodItems</TableCell>
                        <TableCell>Shift</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {KhaowaPolaPains.map((row, index) => 
                        <KhaowaPolaPain key={index} row={row} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    );
};

export default KhabarNeyaPolaPain;