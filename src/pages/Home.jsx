import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
// import SchoolRequestForm from "../components/SchoolRequestForm";
import { Helmet } from "react-helmet";
import InstitutionRequestForm from "../components/InstitutionRequestForm";

export default function Home() {
  // export default function Home() {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="font-extralight font-serial bg-white text-gray-800 antialiased">
      <Helmet>
        <title>RFID Attendance System - Simplify School Attendance</title>
        <meta
          name="description"
          content="Modern RFID-based attendance system to automate school attendance, entry-exit logs & parent notifications."
        />
      </Helmet>
      <Navbar />
      <Hero onGetStartedClick={scrollToForm} />
      <Features />
      <CTA />
      {/* <SchoolRequestForm /> */}
      <InstitutionRequestForm id="registration-form" />
      <Footer />
    </div>
  );
}
