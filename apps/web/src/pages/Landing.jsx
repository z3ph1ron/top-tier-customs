import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Calendar,
  Wrench,
  Zap,
  Star,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Performance Tuning",
      description:
        "Unlock your vehicle's true potential with our expert ECU remapping and performance upgrades.",
      popular: true,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Custom Bodywork",
      description:
        "Transform your ride with bespoke body kits, wraps, and aerodynamic enhancements.",
      popular: false,
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Interior Styling",
      description:
        "Premium interior modifications including custom upholstery, lighting, and electronics.",
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "James Mitchell",
      vehicle: "BMW M3",
      text: "Top Tier Customs transformed my M3 into an absolute beast. The attention to detail is unmatched!",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      vehicle: "Audi RS6",
      text: "Professional service from start to finish. My RS6 has never looked or performed better.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      vehicle: "Mercedes AMG GT",
      text: "These guys are the real deal. Best custom work in London, hands down.",
      rating: 5,
    },
  ];

  const gallery = [
    { title: "BMW M5 Stage 3", category: "Performance" },
    { title: "Audi RS7 Carbon Kit", category: "Bodywork" },
    { title: "Mercedes C63 Interior", category: "Interior" },
    { title: "Porsche 911 Turbo", category: "Complete Build" },
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      {/* <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold">
                <span className="text-white">TT</span>
                <span className="text-red-600">C</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-300">
                TOP TIER CUSTOMS
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-300 hover:text-red-600 transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-red-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#gallery"
                className="text-gray-300 hover:text-red-600 transition-colors font-medium"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-red-600 transition-colors font-medium"
              >
                Contact
              </a>
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50">
                Shop Now
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-red-600/20">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#services"
                className="block text-gray-300 hover:text-red-600 transition-colors py-2"
              >
                Services
              </a>
              <a
                href="#about"
                className="block text-gray-300 hover:text-red-600 transition-colors py-2"
              >
                About
              </a>
              <a
                href="#gallery"
                className="block text-gray-300 hover:text-red-600 transition-colors py-2"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="block text-gray-300 hover:text-red-600 transition-colors py-2"
              >
                Contact
              </a>
              <button className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        )}
      </nav> */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-red-600 rounded-full animate-pulse"
                style={{
                  width: Math.random() * 4 + 1 + "px",
                  height: Math.random() * 4 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  animationDuration: Math.random() * 3 + 2 + "s",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              ELEVATE YOUR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700 animate-pulse">
                RIDE
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              London's premier destination for luxury automotive customization
              and performance upgrades. Transform your vehicle into a
              masterpiece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Book Service</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-transparent border-2 border-white hover:border-red-600 hover:bg-red-600/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Products</span>
              </button>
            </div>
          </div>

          <div className="mt-16 flex justify-center space-x-12 text-center">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "10+", label: "Years Experience" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-red-600 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-red-600 rotate-90" />
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              OUR <span className="text-red-600">SERVICES</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From performance tuning to complete custom builds, we deliver
              excellence in every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border-2 border-gray-800 hover:border-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20 overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <div className="text-red-600 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <button className="text-red-600 font-semibold flex items-center space-x-2 group-hover:space-x-4 transition-all">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
                CRAFTING{" "}
                <span className="text-red-600">AUTOMOTIVE EXCELLENCE</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Top Tier Customs is London's leading automotive customization
                specialist, dedicated to transforming ordinary vehicles into
                extraordinary machines. With over a decade of experience, our
                team of expert technicians combines cutting-edge technology with
                artisan craftsmanship.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                From subtle refinements to complete transformations, we work
                closely with each client to bring their automotive vision to
                life. Every project receives our signature attention to detail
                and commitment to perfection.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-red-600">ASE</div>
                  <div className="text-xs text-gray-400">
                    Certified Technicians
                  </div>
                </div>
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-red-600">OEM</div>
                  <div className="text-xs text-gray-400">Quality Parts</div>
                </div>
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-red-600">
                    WARRANTY
                  </div>
                  <div className="text-xs text-gray-400">
                    All Work Guaranteed
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl border-2 border-red-600/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-black text-red-600 mb-4">
                    TTC
                  </div>
                  <div className="text-gray-400 text-lg">
                    Excellence in Motion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              CLIENT <span className="text-red-600">REVIEWS</span>
            </h2>
          </div>

          <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 sm:p-12 rounded-2xl border-2 border-red-600/30">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[activeTestimonial].rating)].map(
                (_, i) => (
                  <Star key={i} className="w-6 h-6 text-red-600 fill-red-600" />
                )
              )}
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 text-center mb-6 italic">
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="text-center">
              <div className="font-bold text-lg">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="text-red-600 text-sm">
                {testimonials[activeTestimonial].vehicle}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === activeTestimonial ? "bg-red-600 w-8" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              FEATURED <span className="text-red-600">BUILDS</span>
            </h2>
            <p className="text-gray-400 text-lg">
              A showcase of our finest work
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border-2 border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl font-black mb-2 group-hover:scale-110 transition-transform">
                    {item.title.split(" ")[0]}
                  </div>
                  <div className="text-sm text-gray-400">{item.category}</div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-sm">
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            READY TO TRANSFORM YOUR RIDE?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Book a consultation today and let's discuss your project. Your dream
            build is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Consultation</span>
            </button>
            <button className="bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-black mb-4">
                <span className="text-white">TT</span>
                <span className="text-red-600">C</span>
              </div>
              <p className="text-gray-400 text-sm">
                London's premier automotive customization specialists.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-red-600">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#services"
                  className="block text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="block text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  About Us
                </a>
                <a
                  href="#gallery"
                  className="block text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Gallery
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  Shop
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-red-600">Contact</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>London, United Kingdom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+44 20 1234 5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@toptiercustoms.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-red-600">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Top Tier Customs LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
