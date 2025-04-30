import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
    const [formData, setFormData] = useState({
        image: null,
        location: "",
        title: "",
        description: "",
    });

    const [preview, setPreview] = useState(null);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imageName, setImageName] = useState("");

    const fileInputRef = useState(null);

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
            setImageName(file.name);
        } else if (name === "location") {
            setFormData({ ...formData, location: value });

            if (value) {
                setIsLoading(true);
                try {
                    const response = await axios.get(
                        `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=1a6291de33664744816adabb9b50d174`
                    );
                    const locations = response.data.results.map((result) => result.formatted);
                    setFilteredLocations(locations);
                } catch (error) {
                    console.error("Error fetching location data", error);
                }
                setIsLoading(false);
            } else {
                setFilteredLocations([]);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        // Handle form submission logic here
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-purple-600">Add New Listing</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2 text-lg">Upload Image</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={imageName}
                            readOnly
                            placeholder="No file selected"
                            className="flex-grow border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black bg-white"
                        />
                        <label className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg cursor-pointer transition duration-300">
                            Select Image
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-5 h-64 w-full object-cover rounded-lg border-2 border-gray-300 shadow-lg"
                        />
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2 text-lg">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                        required
                    />
                </div>

                {/* Location */}
                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2 text-lg">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter location"
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                        required
                    />
                    {filteredLocations.length > 0 && (
                        <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md absolute w-full z-10">
                            {filteredLocations.map((loc, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-purple-200 text-black"
                                    onClick={() => {
                                        setFormData({ ...formData, location: loc });
                                        setFilteredLocations([]);
                                    }}
                                >
                                    {loc}
                                </li>
                            ))}
                        </ul>
                    )}
                    {isLoading && (
                        <div className="absolute mt-2 text-center w-full text-gray-500">Loading...</div>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2 text-lg">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Enter description"
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                        required
                    ></textarea>
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Upload Listing
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
