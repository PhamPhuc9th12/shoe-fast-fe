import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserLayOut from "./layout/UserLayout";
import { BrowserRouter as Router } from "react-router-dom";
import AdminLayOut from './layout/AdminLayout';
function App() {
  return (
    <div className="container-fluid">
      <Router>
        <UserLayOut></UserLayOut>
        <AdminLayOut></AdminLayOut>
      </Router>
    </div>
  );
}

export default App;
