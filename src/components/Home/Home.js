import React from 'react';
import FoodItems from '../FoodItems/FoodItems';
import StudentsTable from '../StudentsTable/StudentsTable' 

const Home = () => {
    return (
        <div style={{marginBottom: '80px'}}>
            <StudentsTable/>
            <FoodItems/>
        </div>
    );
};

export default Home;