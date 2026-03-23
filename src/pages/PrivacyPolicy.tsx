import { useSEO } from '../hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy',
    description: 'WesternProperties Privacy Policy — how we collect, use, and protect your personal information.',
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-[#0a2240] mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">1. Introduction</h2>
              <p>WesternProperties ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website westernproperties.in or use any of our services. Please read this policy carefully. If you disagree with any of its terms, please discontinue use of our website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">2. Information We Collect</h2>
              <p className="mb-2"><strong>2.1 Information You Provide Directly</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name, phone number, and email address when you submit a contact or property enquiry form</li>
                <li>Property details such as location and description when you submit a sell-your-property enquiry</li>
                <li>Any other information you voluntarily provide in message fields</li>
              </ul>
              <p className="mt-3 mb-2"><strong>2.2 Information Collected Automatically</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pages visited on our website and the time of visit</li>
                <li>Browser type and device information (user agent string)</li>
                <li>Referring website URL</li>
                <li>Anonymous session identifier (stored in browser session storage, not a cookie)</li>
              </ul>
              <p className="mt-3">We do <strong>not</strong> collect IP addresses beyond what is standard in server logs, and we do <strong>not</strong> use third-party advertising or cross-site tracking technologies.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To respond to your property enquiries and follow up on your interest</li>
                <li>To connect property sellers with our team for listing and valuation assistance</li>
                <li>To improve our website content, user experience, and service offerings based on aggregate usage analytics</li>
                <li>To comply with applicable laws and regulations</li>
              </ul>
              <p className="mt-3">We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We do not use your information for automated decision-making or profiling.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">4. Data Storage and Security</h2>
              <p>Your personal data is securely stored in our database hosted on Supabase, which employs industry-standard encryption at rest and in transit (TLS/SSL). Access to stored data is restricted to authorized personnel only. While we take reasonable precautions, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">5. Data Retention</h2>
              <p>Enquiry data is retained for a period of three (3) years from the date of submission to allow us to serve returning clients and meet legal record-keeping requirements. Analytics data (page views) is retained for twelve (12) months. You may request deletion of your personal data at any time by contacting us at <a href="mailto:info@westernproperties.in" className="text-[#c9a84c] hover:underline">info@westernproperties.in</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">6. Cookies and Tracking</h2>
              <p>We use minimal browser session storage (not persistent cookies) to generate an anonymous session identifier for analytics purposes only. This identifier is not linked to any personal information and expires when you close your browser. We do not use advertising cookies or third-party trackers. You may adjust your browser settings to block session storage, though this will not affect your ability to use the website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">7. Third-Party Services</h2>
              <p>Our website may contain links to external websites or third-party services (such as WhatsApp, Google Maps embeds, or Pexels images). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before interacting with them.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">8. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal data ("right to be forgotten")</li>
                <li>Withdraw consent for us to contact you at any time</li>
                <li>Lodge a complaint with a data protection authority if applicable in your jurisdiction</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:info@westernproperties.in" className="text-[#c9a84c] hover:underline">info@westernproperties.in</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">9. Children's Privacy</h2>
              <p>Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted information to us, please contact us and we will promptly delete it.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">10. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">11. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <address className="mt-3 not-italic bg-gray-50 rounded-xl p-4 text-sm">
                <strong>WesternProperties</strong><br />
                123 Western Avenue, Beach Road, Goa - 403001, India<br />
                Email: <a href="mailto:info@westernproperties.in" className="text-[#c9a84c] hover:underline">info@westernproperties.in</a><br />
                Phone: +91 98765 43210
              </address>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
