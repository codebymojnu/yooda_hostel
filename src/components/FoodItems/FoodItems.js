import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './FoodItems.css';

const FoodItems = () => {
    const [foodItems, setFoodItems] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch('https://frozen-woodland-52666.herokuapp.com/api/foodItems')
            .then(res => res.json())
            .then(data => setFoodItems(data));
    }, [])

    // Delete an item
    const deleteItem = (id) => {
        fetch(`https://frozen-woodland-52666.herokuapp.com/delete-food/${id}`, {
            method: 'DELETE'
        })
    .then(res => res.json())
    .then(result => {
        alert('1 food item deleted');
        document.querySelector(`.m${id}`).style.display = 'none';
    })
    }

    //update food item
    const updateFoodItem = (id) => {
        history.push(`/updateItem/${id}`)
    }
    return (
        <Container>
            <TableContainer>
                <h4 style={{ textAlign: 'center', marginTop: '40px' }}>Food Items List</h4>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Cost Price</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {foodItems.map((row) => (
                            <TableRow
                                className={"m" + row._id}
                                key={row.name}
                            >
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell onClick={() => updateFoodItem(row._id)} className="editBtn"><FontAwesomeIcon icon={faPenToSquare} /></TableCell>
                                <TableCell onClick={() => deleteItem(row._id)} className="deleteBtn"><FontAwesomeIcon icon={faTrashCan}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default FoodItems;