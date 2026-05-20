import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Download from './components/Download';
import Footer from './components/Footer';
import { useLatestRelease } from './hooks/useLatestRelease';

export default function App() {
  const { release, loading } = useLatestRelease();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Generator />
        <Features />
        <HowItWorks />
        <Download release={release} loading={loading} />
      </main>
      <Footer />
    </>
  );
}
