import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Place Arena",
  description:
    "Learn about Place Arena - your trusted platform for finding and listing properties",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-16">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            About Place Arena
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Your trusted platform for finding, listing, and exploring properties
            with ease.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Place Arena
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At Place Arena, we believe that searching for a new home, rental,
              or investment property should be simple, transparent, and
              stress-free. Our mission is to connect property owners, buyers,
              and renters on one secure and user-friendly platform.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-6">
                <i className="ri-target-line text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To make property search and listing easier, faster, and more
                reliable by bringing all opportunities into one place.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              What We Offer
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg mb-4">
                  <i className="ri-home-gear-line text-xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  For Property Owners
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  A simple way to list properties with descriptions, images, and
                  pricing.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg mb-4">
                  <i className="ri-search-line text-xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  For Buyers & Renters
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Access to verified property listings that match your needs.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg mb-4">
                  <i className="ri-shield-check-line text-xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Secure Platform
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Safe account management, verified listings, and trusted
                  payment options.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg mb-4">
                  <i className="ri-user-smile-line text-xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  User-Friendly Experience
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Easy navigation and smart search features for a smooth
                  property journey.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Choose Place Arena?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Wide Range of Property Listings
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      From family homes to commercial spaces, find exactly what{" "}
                      {"you're"} looking for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Simple Posting Process
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      List your property in minutes with our intuitive posting
                      system.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Reliable and Secure Platform
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Your data and transactions are protected with
                      industry-standard security.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Designed for Bangladesh
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Built specifically for the Bangladeshi market with global
                      standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
                <i className="ri-eye-line text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To become the most reliable and innovative property listing
                platform in Bangladesh, where users can find their perfect place
                with confidence.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                1000+
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                Properties Listed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                Happy Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                Areas Covered
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                Support Available
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Have questions or want to know more? {"We'd"} love to hear from
                you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg mb-4">
                  <i className="ri-mail-line text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Email Us
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  placearena.hr@gmail.com
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg mb-4">
                  <i className="ri-phone-line text-xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Call Us
                </h4>
                <p className="text-gray-700 dark:text-gray-300">01910683176</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide us in building the best property
              platform for Bangladesh.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full mb-6">
                <i className="ri-heart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Trust
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Building lasting relationships through transparency and
                reliability in every interaction.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full mb-6">
                <i className="ri-lightbulb-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Innovation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Continuously improving our platform with the latest technology
                and user feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full mb-6">
                <i className="ri-customer-service-2-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Support
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Providing exceptional customer service to help you achieve your
                property goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
