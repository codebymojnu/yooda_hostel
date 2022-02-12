import { TableCell, TableRow } from '@mui/material';
import React  from 'react';

const KhaowaPolaPain = (props) => {
    const { fullName, studentId, status } = props.row;

    
    return (
        <TableRow
        >
            <TableCell>
                {fullName}
            </TableCell>
            <TableCell>{studentId}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{props.row?.foodItemsList[0]},   {props.row?.foodItemsList[1]}, {props.row?.foodItemsList[2]}</TableCell>
        </TableRow>
    );
};

export default KhaowaPolaPain;