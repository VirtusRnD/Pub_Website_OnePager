import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import SignatureMenu from "./components/SignatureMenu";
import CustomerReviews from "./components/CustomerReviews";
import Menu from "./components/Menu";
import Footer from "./components/Footer"; // 👑 YENİ

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <div id="our-story">
        <OurStory />
      </div>
      <SignatureMenu />
      <CustomerReviews />
      <Menu />

      {/* 👑 SİTENİN KAPANIŞI */}
      <Footer />
    </div>
  );
}

export default App;
