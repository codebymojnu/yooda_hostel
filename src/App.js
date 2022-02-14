import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddFood from "./components/AddFood/AddFood";
import AddStudent from "./components/AddStudent/AddStudent";
import CheckStatus from "./components/CheckStatus/CheckStatus";
import Distribution from "./components/Distribution/Distribution";
import FoodItems from "./components/FoodItems/FoodItems";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import StudentsTable from "./components/StudentsTable/StudentsTable";
import UpdateFoodItem from "./components/UpdateFoodItem/UpdateFoodItem";
import UpdateStudent from "./components/UpdateStudent/UpdateStudent";

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/status">
          <CheckStatus/>
        </Route>
        <Route path="/addstudent">
          <AddStudent/>
        </Route>
        <Route path="/update-student/:id">
          <UpdateStudent/>
        </Route>
        <Route path="/distribution">
          <Distribution/>
        </Route>
        <Route path="/students-list">
          <StudentsTable/>
        </Route>
        <Route path="/addfood">
          <AddFood/>
        </Route>
        <Route path="/foodItems">
          <FoodItems/>
        </Route>
        <Route path="/updateItem/:id">
          <UpdateFoodItem/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
