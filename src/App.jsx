import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AssessRisk from './pages/AssessRisk'
import Result from './pages/Result'
import TechnicalDetails from './pages/TechnicalDetails'
import About from './pages/About'
import FAQ from "./pages/FAQ";




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/assess" element={<AssessRisk />} />
        <Route path="/result" element={<Result />}/>
        <Route path="/technical" element={<TechnicalDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
