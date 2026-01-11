import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AssessRisk from './pages/AssessRisk'
import Result from './pages/Result'
import TechnicalDetails from './pages/TechnicalDetails'
import About from './pages/About'
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";



import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/assess" element={<AssessRisk />} />
        <Route path="/result" element={<Result />}/>
        <Route path="/technical" element={<TechnicalDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics debug={false} />
    </BrowserRouter>
  )
}

export default App;
