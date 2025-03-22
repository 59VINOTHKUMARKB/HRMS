import { motion } from "framer-motion";
import React from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiPlay,
  FiSettings,
  FiShield,
  FiStar,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-blue-700 -rotate-6 p-2.5 rounded-xl">
                <span className="text-xl font-bold text-white -rotate-6">
                  HR
                </span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                by Nex-Gen
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#solutions"
                className="text-gray-600 hover:text-blue-700 font-medium"
              >
                Solutions
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-700 font-medium"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-700 font-medium"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-700 font-medium"
              >
                Pricing
              </a>
            </div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <SignOutButton />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/signin/user"
                  className="text-blue-700 font-semibold hover:text-blue-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/signin/admin"
                  className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Empower Your <span className="text-blue-700">Workforce</span>{" "}
                With Modern HR
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your HR operations with our comprehensive platform.
                Streamline processes, boost productivity, and create a better
                workplace experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-all">
                  Start Free Trial
                  <FiArrowRight />
                </button>
                <button className="flex items-center justify-center gap-2 border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                  <FiPlay />
                  Watch Demo
                </button>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    98%
                  </div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    10k+
                  </div>
                  <div className="text-gray-600">Companies Trust Us</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8">
                <img
                  src="/hero.jpg"
                  alt="HR Dashboard"
                  className="rounded-lg h-full w-full shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-700 text-white p-4 rounded-xl">
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-6 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Nex-Gen HRMS?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of HR management with our comprehensive
              suite of features designed to make your work easier and more
              efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiHeart,
                title: "Employee-Centric",
                description:
                  "Put your employees first with our intuitive self-service portal and engagement tools.",
                color: "blue",
              },
              {
                icon: FiSettings,
                title: "Automation Power",
                description:
                  "Automate repetitive tasks and workflows to save time and reduce errors.",
                color: "purple",
              },
              {
                icon: FiShield,
                title: "Enterprise Security",
                description:
                  "Bank-grade security to protect your sensitive HR data and ensure compliance.",
                color: "green",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-${benefit.color}-100 flex items-center justify-center mb-6`}
                >
                  <benefit.icon
                    className={`w-7 h-7 text-${benefit.color}-600`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Powerful Features for Modern HR Teams
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our platform comes packed with all the tools you need to manage
                your workforce effectively.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Smart Employee Management",
                    description:
                      "Complete employee lifecycle management from hire to retire.",
                  },
                  {
                    title: "Automated Payroll System",
                    description:
                      "Error-free payroll processing with tax compliance.",
                  },
                  {
                    title: "Advanced Analytics",
                    description:
                      "Data-driven insights for better decision making.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
                <img
                  src="/hero.jpg"
                  alt="HR Features"
                  className="rounded-lg h-full w-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl transform -rotate-6 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Loved by HR Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about their experience with
              Nex-Gen HRMS.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "HR Director",
                company: "Tech Corp",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
                quote:
                  "Nex-Gen HRMS has transformed how we manage our HR operations. The automation features alone have saved us countless hours.",
              },
              {
                name: "Michael Chen",
                role: "CEO",
                company: "StartUp Inc",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
                quote:
                  "The best HR software we've used. It's intuitive, powerful, and the support team is amazing.",
              },
              {
                name: "Emily Brown",
                role: "HR Manager",
                company: "Global Solutions",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
                quote:
                  "Implementing Nex-Gen HRMS was the best decision we made for our HR department. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your HR Management?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of companies already using Nex-Gen HRMS to
              streamline their HR operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-tr from-blue-700 to-purple-700 p-2.5 rounded-xl">
                  <span className="text-xl font-bold">HRMS</span>
                </div>
                <span className="text-xl font-bold">Nex-Gen</span>
              </div>
              <p className="text-gray-400">
                Making HR management simple and efficient for modern businesses.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Solutions", "Pricing", "Updates"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Partners"],
              },
              {
                title: "Resources",
                links: ["Blog", "Newsletter", "Events", "Help Center"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Nex-Gen HRMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
