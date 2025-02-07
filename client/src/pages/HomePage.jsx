import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiClock,
  FiDollarSign,
  FiBarChart2,
  FiAward,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import CloudinaryUpload from "../components/CloudinaryUpload";

const HomePage = () => {
  
  const cld = new Cloudinary({ cloud: { cloudName: "dnez6l71o" } });

  const handleImageUpload = (imageUrl) => {
    console.log("Uploaded image URL:", imageUrl);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Navigation */}
      <nav className="shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">HR</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">HRMS</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
            </div>
            <div className="space-x-4">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                Login
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
          </div>
          <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold inline-block mb-6">
            HR Management Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Your
            <span className="text-blue-600"> HR Management</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Streamline your HR processes with our comprehensive human resource
            management system. Everything you need in one powerful platform.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-200">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center space-x-2">
              <span className="text-2xl">▶</span>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <span className="text-gray-500">Trusted by leading companies:</span>
            {["AAA", "BBB", "CCC", "DDD"].map((company) => (
              <span
                key={company}
                className="text-gray-400 font-semibold text-xl"
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-24">
          {[
            {
              icon: FiUsers,
              label: "Active Users",
              value: "10,000+",
              color: "blue",
            },
            {
              icon: FiClock,
              label: "Time Saved",
              value: "250hrs/month",
              color: "green",
            },
            {
              icon: FiDollarSign,
              label: "Cost Reduced",
              value: "35%",
              color: "purple",
            },
            {
              icon: FiBarChart2,
              label: "Efficiency Gain",
              value: "45%",
              color: "orange",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-lg bg-${stat.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Features Section */}
        <section id="features" className="py-24">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
              Features
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to manage your entire HR operations
              efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Employee Management",
                description:
                  "Complete employee lifecycle management from onboarding to exit.",
                icon: FiUsers,
                color: "blue",
                features: [
                  "Profile Management",
                  "Document Storage",
                  "Performance Tracking",
                ],
              },
              {
                title: "Attendance System",
                description:
                  "Advanced time tracking with integrated leave management.",
                icon: FiClock,
                color: "green",
                features: [
                  "Biometric Integration",
                  "Leave Management",
                  "Time Tracking",
                ],
              },
              {
                title: "Payroll Processing",
                description:
                  "Automated payroll with tax calculations and compliance.",
                icon: FiDollarSign,
                color: "purple",
                features: [
                  "Salary Processing",
                  "Tax Management",
                  "Benefits Administration",
                ],
              },
              {
                title: "Performance Reviews",
                description: "Comprehensive performance evaluation system.",
                icon: FiAward,
                color: "yellow",
                features: ["360° Feedback", "Goal Setting", "Review Cycles"],
              },
              {
                title: "Training Portal",
                description: "Integrated learning and development platform.",
                icon: FiTrendingUp,
                color: "pink",
                features: [
                  "Course Management",
                  "Progress Tracking",
                  "Certifications",
                ],
              },
              {
                title: "Analytics Dashboard",
                description: "Powerful insights and customizable reports.",
                icon: FiBarChart2,
                color: "indigo",
                features: [
                  "Custom Reports",
                  "Data Visualization",
                  "Trend Analysis",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon
                    className={`w-7 h-7 text-${feature.color}-600`}
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-blue-600 rounded-3xl transform -skew-y-2"></div>
          <div className="relative bg-blue-600 text-white rounded-2xl p-16 my-20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your HR Management?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Join thousands of companies that trust our HRMS platform to
                manage their workforce efficiently
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-blue-700 transition-all transform hover:scale-105">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HRMS</h3>
              <p className="text-gray-600">
                Making HR management simple and efficient
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Solutions</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            <p>© 2024 HRMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
