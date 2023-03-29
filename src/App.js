import { useState } from 'react';
import './assets/css/App.css';
import { Router } from './routes/Router';

function App() {
  let currentUser = localStorage.getItem('user');
  currentUser = currentUser ? JSON.parse(currentUser) : {};

  const [user, setUser] = useState(currentUser);

  return (
      <Router user={user} setUser={setUser} />
  );
}

export default App;
