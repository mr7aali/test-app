import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Place Arena",
  description: "Read our terms and conditions for using Place Arena property platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-purple-100">
            Please read these terms carefully before using Place Arena
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
            <div className="mb-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to Place Arena. By accessing or using our website and services, you agree to these Terms & Conditions. Please read them carefully before using our platform.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By using Place Arena, you agree to comply with these Terms & Conditions, our Privacy Policy, and any other policies we publish. If you do not agree, please stop using our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Eligibility
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    You must be at least 13 years old to use our website.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    You must provide true, accurate, and complete information during registration.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Place Arena reserves the right to suspend or terminate accounts that provide false or misleading details.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  User Accounts
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    To post or manage property listings, you may need to create an account.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    You are responsible for keeping your login details safe.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Any activity done under your account will be considered your responsibility.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Property Listings
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Users may post properties with descriptions, prices, and images.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    All listings must be accurate, lawful, and original.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Place Arena does not verify listings. Users must do their own checks before making decisions.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                  Payments
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We may provide secure payment options (such as Bkash, Nagad, Rocket) for certain services.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    All fees are non-refundable unless otherwise stated.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Place Arena is not responsible for payment failures, disputes, or chargebacks between users.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                  Prohibited Activities
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When using Place Arena, you must not:
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Post false, misleading, or illegal property listings.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Use the platform for fraud, scams, or unlawful purposes.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Upload harmful files, spam, or offensive material.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Attempt to hack, damage, or disrupt the website.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                  Intellectual Property
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    All design, branding, and content on Place Arena belong to us and are protected by law.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    You cannot copy, distribute, or use our content without permission.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    By posting content (like property photos), you allow Place Arena to use, display, and promote it on our platform.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                  Limitation of Liability
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    Place Arena is a platform only. We do not act as a broker, agent, or guarantor.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We are not responsible for the accuracy of listings or transactions between users.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We are not liable for damages, fraud, or losses resulting from use of the platform.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
                  Privacy & Data
                </h2>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We collect and use your data as described in our Privacy Policy.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    We take security seriously but cannot guarantee complete protection of data.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">10</span>
                  Termination of Use
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We may suspend or terminate your account if you:
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Break these Terms & Conditions.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Post fraudulent or harmful listings.
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-red-500 mr-2 mt-1"></i>
                    Misuse our services.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">11</span>
                  Governing Law
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  These Terms & Conditions are governed by the laws of Bangladesh. All disputes shall be handled under the jurisdiction of courts in Bangladesh.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">12</span>
                  Updates to Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may update these Terms & Conditions at any time. Changes will be effective once posted on the website. Continuing to use Place Arena means you accept the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">13</span>
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For questions or concerns, please reach out:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-mail-line text-purple-600 mr-3 text-xl"></i>
                      <span className="text-gray-700 dark:text-gray-300">placearena.hr@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-phone-line text-purple-600 mr-3 text-xl"></i>
                      <span className="text-gray-700 dark:text-gray-300">01910683176</span>
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
