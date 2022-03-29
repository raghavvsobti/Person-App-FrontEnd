import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import UserDetails from "./screens/UserDetails";
import Header from "./Components/Header";
import CreateUser from "./screens/CreateUser";
import EditUser from "./screens/Edituser";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/:userId" element={<UserDetails />} />
        <Route exact path="/create-new-user" element={<CreateUser />} />
        <Route exact path="/:userId/edit" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
