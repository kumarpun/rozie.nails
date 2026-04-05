import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/getContent";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | Rozie Nails",
  description: "Browse all nail designs and work by Rozie Gurung.",
};

export default async function GalleryPage() {
  const [galleryContent, footerContent] = await Promise.all([
    getContent("gallery"),
    getContent("footer"),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Gallery data={galleryContent?.gallery} />
      </main>
      <Footer data={footerContent?.footer} />
    </>
  );
}
