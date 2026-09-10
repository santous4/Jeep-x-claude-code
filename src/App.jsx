import { useState } from "react";
import { ANNOUNCEMENT_TEXT } from "./data/content.js";
import { useSiteMotion } from "./hooks/useSiteMotion.js";

import "./styles/chrome.css";
import "./styles/hero.css";
import "./styles/lineup.css";
import "./styles/tools.css";
import "./styles/gallery.css";
import "./styles/preowned.css";
import "./styles/why.css";

import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Lineup from "./components/Lineup.jsx";
import ShoppingTools from "./components/ShoppingTools.jsx";
import LifeGallery from "./components/LifeGallery.jsx";
import PreOwned from "./components/PreOwned.jsx";
import WhyJeep from "./components/WhyJeep.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  const [bannerOpen, setBannerOpen] = useState(true);
  useSiteMotion();

  return (
    <div style={{ overflowX: "clip" }}>
      <ScrollProgressBar />

      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        {bannerOpen && <AnnouncementBar text={ANNOUNCEMENT_TEXT} onDismiss={() => setBannerOpen(false)} />}
        <Header />
      </div>

      <Hero />
      <Lineup />
      <ShoppingTools />
      <LifeGallery />
      <PreOwned />
      <WhyJeep />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
