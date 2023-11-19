import { Routes, Route, HashRouter } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import MainTimer from './_pages/MainTimer';
import BreakPage from './_pages/BreakPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/break" element={<BreakPage />} />
        <Route path="/" element={<MainTimer />} />
      </Routes>
    </HashRouter>
  );
}
