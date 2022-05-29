import './App.css';

import Navigation from './components/navigation/Navigation';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path='/'></Route>
      </Routes>
    </Router>
  );
}

export default App;
