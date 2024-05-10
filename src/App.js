import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailRoom from './Screens/DetailRoom/DetailRoom';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import Login from './Screens/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home-screen" element={<HomeScreen />} />
      <Route path="/home-screen/detail-room" element={<DetailRoom />} />
    </Routes>
  );
}

export default App;
