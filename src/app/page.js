import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import { getAllContent } from "@/lib/getContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getAllContent();

  return (
    <>
      <Navbar />
      <main>
        <Hero data={content.hero?.hero} />
        <Services data={content.services?.services} />
        <About data={content.about?.about} />
        <Gallery data={content.gallery?.gallery} limit={6} showViewAll />
        <Testimonials data={content.testimonials?.testimonials} />
        <Booking data={content.booking?.booking} services={content.services?.services?.items} />
      </main>
      <Footer data={content.footer?.footer} />
    </>
  );
}
