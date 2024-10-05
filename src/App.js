
import './App.css';
import UserLayOut from "./Layout/UserLayout";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <UserLayOut></UserLayOut> 
      </Router>
    </div>
  );
}

export default App;
