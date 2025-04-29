import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";

const ListGallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch gallery images from the backend
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/images");
        console.log("rresponse from bsckend", response.body);
        const data = await response.json();
        setItems(data);
        console.log("setItem", items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="bg-lightGray">
      {/* Header Section */}
      <header className="text-white text-center pt-20">
        <h1 className="text-4xl font-bold">Available For Rent</h1>
      </header>

      {/* Image Gallery */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-32">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="relative group">
                <SkeletonLoader />
              </div>
            ))
          : items.map((item) => (
              <div key={item.id} className="relative group">
                <a href={item.image}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-lg transition-transform transform group-hover:scale-105"
                  />
                </a>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center rounded-b-lg">
                  <span className="text-[#f1dabf] font-semibold text-lg">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ListGallery;
