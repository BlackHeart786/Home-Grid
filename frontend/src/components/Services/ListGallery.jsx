import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/images");
        setImages(response.data);
        setFilteredImages(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load images"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  // Handle search filtering
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = images.filter((img) =>
      img.caption?.toLowerCase().includes(term)
    );
    setFilteredImages(filtered);
  }, [searchTerm, images]);

  const handleImageClick = (listingId) => {
    navigate(`/listings/${listingId}`);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mt-9 mb-6 text-black">
          Available For Rent
        </h1>

        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm sm:text-base text-gray-800"
            />

            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(12)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <SkeletonLoader
                    height="100%"
                    className="relative pt-[100%]"
                  />
                  <div className="p-4">
                    <SkeletonLoader
                      height="20px"
                      width="80%"
                      className="mb-2"
                    />
                    <SkeletonLoader height="12px" width="60%" />
                  </div>
                </div>
              ))
          ) : filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div
                key={image.image_id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleImageClick(image.listing_id)}
              >
                <div className="relative pt-[100%] bg-gray-200">
                  <img
                    src={image.image_url}
                    alt={image.caption || "Image"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                  />
                </div>
                <div className="p-4">
                  {image.caption && (
                    <p className="font-medium text-gray-800 mb-2 truncate">
                      {image.caption}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Uploaded: {new Date(image.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl font-semibold">No images found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
