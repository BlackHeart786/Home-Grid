import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";

const ListGallery = () => {
  const items = [
    {
      id: 1,
      image: "https://gallery1.charleskdesigns.com/image/001.jpg",
      title: "Park circus",
    },
    {
      id: 2,
      image: "https://gallery1.charleskdesigns.com/image/002.jpg",
      title: "Howrah",
    },
    {
      id: 3,
      image: "https://gallery1.charleskdesigns.com/image/003.jpg",
      title: "Kalighat",
    },
    {
      id: 4,
      image: "https://gallery1.charleskdesigns.com/image/029.jpg",
      title: "Lorem ipsum",
    },
    {
      id: 5,
      image: "https://gallery1.charleskdesigns.com/image/005.jpg",
      title: "Lorem ipsum",
    },
    {
      id: 6,
      image: "https://gallery1.charleskdesigns.com/image/006.jpg",
      title: "Lorem ipsum",
    },
    {
      id: 7,
      image: "https://gallery1.charleskdesigns.com/image/007.jpg",
      title: "Lorem ipsum",
    },
    {
      id: 8,
      image: "https://gallery1.charleskdesigns.com/image/008.jpg",
      title: "Lorem ipsum",
    },
    {
      id: 9,
      image: "https://gallery1.charleskdesigns.com/image/009.jpg",
      title: "Lorem ipsum",
    },
    {
      id: 10,
      image: "https://gallery1.charleskdesigns.com/image/006.jpg",
      title: "Lorem ipsum",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
          : // Show actual items when not loading
            items.map((item) => (
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
