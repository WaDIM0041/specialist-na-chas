import { MotionProvider } from "./lib/motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionProvider>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>

      {/* зерно поверх — лёгкая фактура плёнки */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </MotionProvider>
  );
}
