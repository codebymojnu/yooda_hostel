import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, FormControlLabel, FormGroup, TableCell, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const StudentsRow = (props) => {
    const history = useHistory();
    const { fullName, roll, age, status, _id } = props.row;
    const [checked, setChecked] = useState(status);

    console.log(status);

    // handle checkbox
    const handleChange = (event) => {
        setChecked(event.target.checked);
        const url = `http://localhost:5000/update-status/${_id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: event.target.checked})
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0) {
                    alert('Successfully updated');
                }
            })
    };

    const handleEditStudent = (id) => {
        history.push(`/update-student/${id}`)
    }

    // handle Delete Student
    // Delete an item
    const handleDeleteStudent = (id) => {
        fetch(`http://localhost:5000/delete-student/${id}`, {
            method: 'DELETE'
        })
    .then(res => res.json())
    .then(result => {
        alert('deleted successfully');
        document.querySelector(`.m${id}`).style.display = 'none';
    })
    }
    return (
        <TableRow className={"m" + _id}
        >
            <TableCell>
                {fullName}
            </TableCell>
            <TableCell>{roll}</TableCell>
            <TableCell>{age}</TableCell>
            <TableCell>
                <Box component="form">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={checked} />} label={checked === true ? 'Active' : 'inActive'} onChange={handleChange}/>
                    </FormGroup>
                </Box>
            </TableCell>
            <TableCell onClick={() => handleEditStudent(_id)} className="editBtn"><FontAwesomeIcon icon={faPenToSquare} /></TableCell>
            <TableCell onClick={() => handleDeleteStudent(_id)} className="deleteBtn"><FontAwesomeIcon icon={faTrashCan}/></TableCell>
        </TableRow>
    );
};

export default StudentsRow;