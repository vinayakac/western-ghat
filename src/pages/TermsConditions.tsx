import { useSEO } from '../hooks/useSEO';

export default function TermsConditions() {
  useSEO({
    title: 'Terms & Conditions',
    description: 'WesternProperties Terms and Conditions — the rules governing use of our website and services.',
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-[#0a2240] mb-2">Terms &amp; Conditions</h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the WesternProperties website (westernproperties.in) and its services, you agree to be bound by these Terms and Conditions. If you do not agree, please cease using the website immediately. These terms apply to all visitors, users, and others who access our website or services.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">2. Description of Services</h2>
              <p>WesternProperties is a real estate platform that facilitates property discovery, listing, and enquiry services. We act as an intermediary and do not directly own or sell properties listed on our platform. All listings are provided for informational purposes only and are subject to availability.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">3. Property Listings and Accuracy</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>We strive to provide accurate and up-to-date property information; however, we make no representations or warranties regarding the accuracy, completeness, or currentness of any listing.</li>
                <li>Property prices, availability, and details are subject to change without notice and must be independently verified before any transaction.</li>
                <li>Photographs and virtual tours are for illustrative purposes only and may not represent the current state of the property.</li>
                <li>WesternProperties is not responsible for any errors or omissions in property details provided by sellers or their agents.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">4. No Professional Advice</h2>
              <p>Content on this website does not constitute legal, financial, investment, or other professional advice. You should independently verify all property details, conduct due diligence, and consult qualified professionals (lawyers, surveyors, financial advisors) before making any property-related decision. WesternProperties accepts no liability for decisions made based solely on information available on this website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">5. User Conduct</h2>
              <p className="mb-2">When using this website, you agree NOT to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submit false, misleading, or fraudulent enquiries or property listings</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Use the website for any unlawful purpose or in violation of applicable laws</li>
                <li>Attempt to gain unauthorized access to any portion of our website or database</li>
                <li>Scrape, crawl, or systematically extract data from the website without prior written permission</li>
                <li>Use the website in any way that could damage, disable, or impair its normal operation</li>
                <li>Post or transmit any unsolicited commercial communications (spam)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">6. Enquiries and Communications</h2>
              <p>By submitting an enquiry through our website, you consent to being contacted by WesternProperties or its representatives via phone, email, or WhatsApp regarding your enquiry. You may opt out of further communications at any time by notifying us. We will not share your contact details with unauthorized third parties.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">7. Intellectual Property</h2>
              <p>All content on this website, including but not limited to text, graphics, logos, and software, is the property of WesternProperties or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without express written permission from us.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">8. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, WesternProperties and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Use of or inability to use our website or services</li>
                <li>Any property transaction entered into based on information from our website</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>Any errors, omissions, or inaccuracies in property listings</li>
              </ul>
              <p className="mt-3">Our maximum aggregate liability for any claim arising under these terms shall not exceed the amount, if any, paid by you to us in the three months preceding the claim.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">9. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of linked sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">10. Indemnification</h2>
              <p>You agree to indemnify and hold harmless WesternProperties, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or in connection with your use of the website, your violation of these terms, or your violation of any third-party rights.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">11. Governing Law and Jurisdiction</h2>
              <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts located in Goa, India.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">12. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms and Conditions at any time. Updated terms will be posted on this page with a revised date. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0a2240] mb-3">13. Contact</h2>
              <address className="not-italic bg-gray-50 rounded-xl p-4 text-sm">
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
