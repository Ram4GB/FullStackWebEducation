import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Student from "./views/Student";
import Report from "./views/Report";
import ClassView from "./views/ClassView";
import ImportFromExcel from "./views/ImportFromExcel";
import EditStudent from "./views/EditStudent";
import EditClass from "./views/EditClass";

Axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Student} />
        <Route path="/editstudent/:id" component={EditStudent} />
        <Route path="/editclass/:id" component={EditClass} />
        <Route exact path="/classview" component={ClassView} />
        <Route exact path="/report" component={Report} />
        <Route exact path="/importfromexcel" component={ImportFromExcel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
