import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const UpdateFoodItem = () => {
    const history = useHistory();
    const [item, setItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/item/${id}`)
            .then(res => res.json())
            .then(data => setItem(data));

    }, [id])

    const handleNameChange = e => {
        const updateName = e.target.value;
        const updateItem = { name: updateName, price: item.price };
        setItem(updateItem);
    }

    const handlePriceChange = e => {
        const updatePrice = e.target.value;
        const updateItem = { name: item.name, price: updatePrice };
        setItem(updateItem);
    }


    const handleUpdate = (event) => {
        const url = `http://localhost:5000/update-product/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                   alert('1 product updated');
                }
            })
        history.push('/foodItems')
        event.preventDefault();
    };
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 10 }}>
            <Typography variant="h6" gutterBottom>
               Update Food Item
            </Typography>
            <Box component="form" onSubmit={() => handleUpdate()} id="formAddFood" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            onChange={handleNameChange}
                            value={item.name || ''}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="price"
                            name="price"
                            onChange={handlePriceChange}
                            value={item.price || ''}
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

export default UpdateFoodItem;