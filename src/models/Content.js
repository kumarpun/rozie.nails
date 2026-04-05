import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,
  price: String,
  duration: String,
  description: String,
  icon: String,
});

const TestimonialSchema = new mongoose.Schema({
  name: String,
  text: String,
  rating: { type: Number, default: 5 },
});

const GalleryItemSchema = new mongoose.Schema({
  image: String,
  label: String,
});

const ContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ["hero", "about", "services", "gallery", "testimonials", "booking", "footer"],
    },
    hero: {
      title: String,
      subtitle: String,
      tagline: String,
      badges: [String],
    },
    about: {
      title: String,
      name: String,
      paragraphs: [String],
      image: String,
      stats: [{ label: String, value: String }],
    },
    services: {
      title: String,
      subtitle: String,
      note: String,
      items: [ServiceSchema],
    },
    gallery: {
      title: String,
      subtitle: String,
      items: [GalleryItemSchema],
    },
    testimonials: {
      title: String,
      subtitle: String,
      items: [TestimonialSchema],
    },
    booking: {
      title: String,
      subtitle: String,
      phone: String,
      instagram: String,
      instagramUrl: String,
      location: String,
      hours: [{ day: String, time: String }],
    },
    footer: {
      tagline: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
