import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";

export default function ListingDetails() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListingDetails() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/listings/${listingId}`
        );
        setListing(response.data.data);
        setImages(response.data.data.images || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load listing details"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchListingDetails();
  }, [listingId]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="container mx-auto">
          <SkeletonLoader height="40px" width="300px" className="mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SkeletonLoader height="400px" className="mb-4" />
              <div className="grid grid-cols-3 gap-2">
                {Array(3)
                  .fill()
                  .map((_, i) => (
                    <SkeletonLoader key={i} height="100px" />
                  ))}
              </div>
            </div>
            <div>
              <SkeletonLoader height="30px" width="80%" className="mb-4" />
              <SkeletonLoader height="20px" width="60%" className="mb-2" />
              <SkeletonLoader height="20px" width="60%" className="mb-2" />
              <SkeletonLoader height="20px" width="60%" className="mb-2" />
              <SkeletonLoader height="100px" className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const primaryImage = images.find((img) => img.is_primary) || images[0];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4 inline-flex items-center"
        >
          ← Back to Listings
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {listing.title}
        </h1>
        <p className="text-gray-500 mb-6">
          {listing.city}, {listing.state}, {listing.country}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {primaryImage && (
              <img
                src={primaryImage.image_url}
                alt={primaryImage.caption || listing.title}
                className="w-full h-[400px] object-cover rounded-xl shadow-md"
                onError={(e) => (e.target.src = "/placeholder-image.jpg")}
              />
            )}

            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {images
                  .filter((img) => img.image_id !== primaryImage?.image_id)
                  .map((image) => (
                    <img
                      key={image.image_id}
                      src={image.image_url}
                      alt={image.caption || listing.title}
                      className="h-[100px] w-full object-cover rounded-md"
                      onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold text-gray-800">
                  ₹{listing.security_deposit}
                </h2>
                <span className="text-sm font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full capitalize">
                  {listing.availability_status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{listing.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Listed On</p>
                  <p className="font-medium">
                    {new Date(listing.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="w-full sm:w-auto flex-1 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
                    💬 Chat
                  </button>
                  <button className="w-full sm:w-auto flex-1 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                    🚀 Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
