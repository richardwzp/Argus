import { Routes, Route, HashRouter } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import BreakPage from './_pages/Break';
import MainTimer from './_pages/MainTimer';

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
