import GalleryApproved from "../components/GalleryApproved";

export default function Gallery() {
  // Header and Footer are already rendered globally in App.jsx.
  return (
    <div className="bg-white min-h-screen mt-30">
      <GalleryApproved />
    </div>
  );
}