import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, profileImage: 'Please select an image file' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: 'Image should be < 5MB' });
        return;
      }

      setProfileImage(file);
      setErrors({ ...errors, profileImage: null });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name || '');
      formDataToSend.append('email', formData.email || '');
      formDataToSend.append('password', formData.password || '');
      formDataToSend.append('phone', formData.phone || '');
      if (profileImage) {
        formDataToSend.append('profile_image', profileImage);
      }

      const response = await axios.post(
        'http://localhost:3000/api/users/register',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Registration successful!');
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      console.error('Registration error:', err);
      const message =
        err.response?.data?.message || err.message || 'Something went wrong';
      setErrors({ ...errors, serverError: message });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-6 py-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-600">Fill in your details to sign up.</p>
        </div>

        {errors.serverError && (
          <div className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded">
            {errors.serverError}
          </div>
        )}

        <div className="flex justify-center mb-4">
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={triggerFileInput}
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <button
              type="button"
              onClick={triggerFileInput}
              className="mt-1 text-xs text-purple-600 hover:underline"
            >
              {previewImage ? "Change photo" : "Add photo"}
            </button>
            {errors.profileImage && (
              <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["name", "email", "password", "confirmPassword", "phone"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field === "confirmPassword" ? "password again" : field}`}
                className={`w-full px-3 py-2 mt-1 rounded border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 mt-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
