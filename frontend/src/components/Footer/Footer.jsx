import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaGithubSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full mx-auto px-4 bg-primary text-white">
      <div className="max-w-screen-xl lg:max-w-screen-2xl mx-auto grid lg:grid-cols-3 gap-8 py-8">
        {/* Left Column (Branding & Social Links) */}
        <div>
          <h1 className="text-2xl font-bold text-black">GRIDE</h1>
          <p className="py-4 text-sm">
            Find your Dream room here. 1st one month you get free trial. After
            you have to get a Subscription. We can suggest you a good room which
            you want to search.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
          </div>
        </div>

        {/* Right Column (Links Sections) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-8 mt-6">
          {/* Solutions */}
          <div>
            <h6 className="font-medium text-black">Solutions</h6>
            <ul>
              <li className="py-2 text-sm">Analytics</li>
              <li className="py-2 text-sm">Marketing</li>
              <li className="py-2 text-sm">Commerce</li>
              <li className="py-2 text-sm">Insights</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="font-medium text-black">Support</h6>
            <ul>
              <li className="py-2 text-sm">Pricing</li>
              <li className="py-2 text-sm">Documentation</li>
              <li className="py-2 text-sm">Guides</li>
              <li className="py-2 text-sm">Suggest</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="font-medium text-black">Company</h6>
            <ul>
              <li className="py-2 text-sm">About</li>
              <li className="py-2 text-sm">Blog</li>
              <li className="py-2 text-sm">Security</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="font-medium text-black">Legal</h6>
            <ul>
              <li className="py-2 text-sm">Claim</li>
              <li className="py-2 text-sm">Policy</li>
              <li className="py-2 text-sm">Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
