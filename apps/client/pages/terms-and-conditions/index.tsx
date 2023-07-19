/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";

import { Layout } from "@/components/layout";

const TermsAndConditionsPage: NextPage = () => {
  return (
    <Layout title={""} description={""}>
      <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
        <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
          <h1 className="font-bold text-2xl">
            Terms and Conditions of Travel Tailor
          </h1>
          <h2 className="text-sm text-gray-600 my-2">
            Last updated: 09/06/2023
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            Please read these Terms and Conditions ("Terms") carefully before
            using the Travel Tailor website (the "Site"). The Terms describe the
            terms and conditions governing your use of the Site and the services
            offered by Travel Tailor. By accessing the Site and using our
            services, you agree to be bound by these Terms. If you do not agree
            to these Terms, please do not use the Site.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">
            1. Travel Tailor Services
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            Travel Tailor is an online travel management website that offers
            services such as flight search, accommodation booking, car rental,
            and customized travel planning. Travel Tailor provides detailed
            information about destinations, flights, accommodations, and tourist
            activities to assist you in planning your trip.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">2. Use of the Site</h2>
          <br />
          <p className="text-sm text-gray-600">
            2.1. Registration: To access certain services or features of the
            Site, you may need to register and create a user account. You are
            responsible for providing accurate and up-to-date information during
            registration, and you agree to maintain the confidentiality of your
            account and password.
          </p>
          <br />
          <p className="text-sm text-gray-600">
            2.2. Lawful Use: You agree to use the Site in a lawful manner and in
            accordance with these Terms. You must not use the Site for illegal,
            fraudulent, or harmful purposes to Travel Tailor or other users. Any
            abusive use of the Site may result in the termination of your
            account and the prohibition of access to the Site.
          </p>
          <br />
          <p className="text-sm text-gray-600">
            2.3. User-Generated Content: You may have the opportunity to submit
            user-generated content on the Site, such as comments, ratings, or
            photos. By submitting content, you grant Travel Tailor a worldwide,
            non-exclusive, royalty-free license to use, reproduce, modify,
            publish, and distribute that content as part of providing our
            services.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">
            3. Reservations and Payments
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            3.1. Availability: Information about the availability of flights,
            accommodations, and other services is provided by third parties and
            may be subject to changes. We do not guarantee the availability of
            the services displayed on the Site, and we reserve the right to
            modify or cancel a reservation if circumstances require.
          </p>
          <br />
          <p className="text-sm text-gray-600">
            3.2. Pricing and Payments: Prices displayed on the Site are quoted
            in the local currency and may be subject to additional taxes and
            fees. You agree to pay the total amount due for reservations made
            through the Site. Payments can be made using the payment methods
            accepted by Travel Tailor.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">
            4. Cancellations and Modifications
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            4.1. Cancellations: The cancellation policies of reservations depend
            on the policies of the respective service providers. You should
            review the applicable cancellation policies before making a
            reservation. Travel Tailor will not be held responsible for
            cancellation or modification fees imposed by service providers.
          </p>
          <br />
          <p className="text-sm text-gray-600">
            4.2. Modifications: If you wish to modify a reservation, please
            contact our customer service. Modifications are subject to service
            availability and may incur additional fees.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">5. Liability</h2>
          <br />
          <p className="text-sm text-gray-600">
            Travel Tailor endeavors to provide accurate and up-to-date
            information on the Site. However, we cannot guarantee the accuracy,
            completeness, or reliability of such information. You acknowledge
            that the use of the Site and Travel Tailor's services is at your own
            risk.
            <br />
            Travel Tailor will not be liable for any direct, indirect,
            consequential, or special damages arising from the use of the Site
            or the inability to use the Site, including loss of profits,
            business interruption, or loss of data.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">
            6. Intellectual Property
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            The Site and its content, including text, graphics, logos, and
            images, are protected by copyright and other intellectual property
            rights owned by Travel Tailor or its partners. You may not copy,
            modify, distribute, or reproduce the content of the Site without
            prior written authorization from Travel Tailor.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">
            7. Changes to the Terms
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            Travel Tailor reserves the right to modify these Terms at any time.
            The modifications will take effect upon their publication on the
            Site. It is your responsibility to regularly check the Terms for any
            modifications. Continued use of the Site after the effective date of
            the modifications constitutes your acceptance of those changes.
          </p>
          <br />
          <h2 className="text-sm text-gray-600 my-2">
            8. Applicable Law and Jurisdiction
          </h2>
          <br />
          <p className="text-sm text-gray-600">
            These Terms are governed and interpreted in accordance with the laws
            in force. Any dispute arising out of these Terms will be subject to
            the exclusive jurisdiction of the competent courts.
          </p>
          <br />
          <p className="text-sm text-gray-600">
            If you have any questions regarding these Terms, please contact us
            at the following address:{" "}
            <span className="text-indigo-600 underline">
              support@travel-tailor.com
            </span>
          </p>
          <br />
          <p className="text-sm text-gray-600 mb-12">
            Thank you for using Travel Tailor!
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default TermsAndConditionsPage;
