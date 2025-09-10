import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Place Arena",
  description:
    "Learn how Place Arena protects your privacy and handles your personal data",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-purple-100">
            Your privacy matters to us. Learn how we protect your data.
          </p>
          <div className="mt-6 text-sm text-purple-200">
            Last Updated: September 5, 2025
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At Place Arena, we respect your privacy and are committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, and safeguard your data when you
                use our website and services.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Information We Collect
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may collect the following types of information when you use
                  our website:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <i className="ri-user-line text-blue-600 mr-2"></i>
                      Personal Information
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Name, email, phone number, address, and account details.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <i className="ri-home-line text-blue-600 mr-2"></i>
                      Property Information
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Details, images, and descriptions of property listings.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <i className="ri-bank-card-line text-blue-600 mr-2"></i>
                      Payment Information
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Transaction details (processed securely through
                      third-party gateways).
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <i className="ri-computer-line text-blue-600 mr-2"></i>
                      Usage Data
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      IP address, browser type, device information, and browsing
                      activity.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Create and manage user accounts.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Publish and manage property listings.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Process payments and transactions.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Improve our website and services.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Communicate with you about updates, offers, or support.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Prevent fraud, abuse, or illegal activity.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Sharing of Information
                </h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    <i className="ri-shield-check-line text-yellow-600 mr-2"></i>
                    We do not sell or trade your personal data.
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  However, we may share your information in the following cases:
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    With service providers (e.g., payment gateways) to process
                    transactions.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    With legal authorities if required by law.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    To protect the rights, safety, or property of Place Arena
                    and its users.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Cookies & Tracking
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We use cookies to improve user experience, remember
                    preferences, and analyze website traffic.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    You may disable cookies in your browser, but some features
                    of Place Arena may not function properly.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  Data Security
                </h2>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                    <li className="flex items-start">
                      <i className="ri-shield-check-line text-green-500 mr-2 mt-1"></i>
                      We take reasonable steps to protect your data from
                      unauthorized access, loss, or misuse.
                    </li>
                    <li className="flex items-start">
                      <i className="ri-information-line text-blue-500 mr-2 mt-1"></i>
                      However, no online system is 100% secure, and we cannot
                      guarantee absolute security.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  Your Rights
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  As a user, you have the right to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <i className="ri-eye-line text-blue-600 text-xl mb-2 block"></i>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Access
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Access the personal information we hold about you.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <i className="ri-edit-line text-blue-600 text-xl mb-2 block"></i>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Update
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Update or correct your details.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <i className="ri-delete-bin-line text-blue-600 text-xl mb-2 block"></i>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Delete
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Request deletion of your data (subject to legal
                      obligations).
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <i className="ri-mail-unread-line text-blue-600 text-xl mb-2 block"></i>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Opt Out
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Opt out of marketing communications at any time.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  Third-Party Services
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Our website may contain links to third-party websites.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We are not responsible for the privacy practices of other
                    websites.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Please review their policies before providing personal
                    information.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  {"Children's"} Privacy
                </h2>
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                    <li className="flex items-start">
                      <i className="ri-information-line text-orange-500 mr-2 mt-1"></i>
                      Place Arena is not intended for users under 13 years old.
                    </li>
                    <li className="flex items-start">
                      <i className="ri-information-line text-orange-500 mr-2 mt-1"></i>
                      We do not knowingly collect personal data from minors.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    9
                  </span>
                  Changes to This Privacy Policy
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We may update this Privacy Policy from time to time.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Updates will be posted on this page with a revised date.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Continued use of our services means you accept the updated
                    policy.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    10
                  </span>
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have questions or concerns about this Privacy Policy,
                  please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-mail-line text-blue-600 mr-3 text-xl"></i>
                      <span className="text-gray-700 dark:text-gray-300">
                        placearena.hr@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-phone-line text-blue-600 mr-3 text-xl"></i>
                      <span className="text-gray-700 dark:text-gray-300">
                        01910683176
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
