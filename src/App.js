import React from "react";
import {Link,Switch, Route} from "react-router-dom";
import Home from "./component/Home";
import PizzaForm from "./component/PizzaForm";

const App = () => {
  return (
    <div className = "App">
      <nav>
        <h1>Lambda Eats</h1>
        <Link to= "/">Home</Link>
        <Link to= "/Pizza">Make My Pizza</Link>
     </nav>
     <Switch>
       <Route exact path="/" component={Home} /> 
       <Route path="/Pizza" component={PizzaForm} />
     </Switch>
     
   </div>

  
  
  );
};
export default App;
