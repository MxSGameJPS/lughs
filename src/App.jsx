import './App.css';
import { HeroSection } from './Components/HeroSection';
import { About } from './Components/About';
import { Lughs } from './Components/Lughs';
import { Gallery } from './Components/Gallery';
import { Video } from './Components/Video';
import { Faq } from './Components/Faq';
import { Footer } from './Components/Footer';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <About />
      <Lughs />
      <Gallery />
      <Video />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
