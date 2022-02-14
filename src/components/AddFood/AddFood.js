import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FoodItems from '../FoodItems/FoodItems';

const AddFood = () => {
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const foodItem = {
            name: data.get('name'),
            price: data.get('price')
        };
        postToServer(foodItem);
    };

    const postToServer = (foodItem) => {
        fetch('http://localhost:5000/addfood', {
            method: 'POST',
            body: JSON.stringify(foodItem),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(item => alert('1 product added'));
        history.push('/foodItems');
    }
    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 10 }}>
                <Typography variant="h6" gutterBottom>
                    Add Food Item
                </Typography>
                <Box component="form" onSubmit={handleSubmit} id="formAddFood" noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Food Name"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="price"
                                name="price"
                                label="Cost Price"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>Add this item</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <FoodItems/>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default AddFood;