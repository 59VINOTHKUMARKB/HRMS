import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiClock, FiDollarSign, FiBarChart2 } from "react-icons/fi";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">HRMS</div>
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Modern HR Management
            <span className="text-blue-600"> Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Streamline your HR processes with our comprehensive human resource
            management system. Everything you need in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors transform hover:scale-105">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
          {[
            { icon: FiUsers, label: "Active Users", value: "10,000+" },
            { icon: FiClock, label: "Time Saved", value: "250hrs/month" },
            { icon: FiDollarSign, label: "Cost Reduced", value: "35%" },
            { icon: FiBarChart2, label: "Efficiency Gain", value: "45%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <section id="features" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Employee Management",
                description:
                  "Complete employee lifecycle management from onboarding to exit.",
                icon: "👥",
              },
              {
                title: "Attendance Tracking",
                description:
                  "Advanced time tracking with leave management system.",
                icon: "📅",
              },
              {
                title: "Payroll System",
                description:
                  "Automated payroll processing with tax calculations.",
                icon: "💰",
              },
              {
                title: "Performance Reviews",
                description: "360-degree feedback and performance tracking.",
                icon: "📈",
              },
              {
                title: "Training & Development",
                description: "Comprehensive learning management system.",
                icon: "🎓",
              },
              {
                title: "Analytics & Reports",
                description: "Detailed insights and customizable reports.",
                icon: "📊",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white rounded-2xl p-12 my-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your HR Management?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of companies that trust our HRMS platform
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors transform hover:scale-105">
              Get Started Now
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
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
