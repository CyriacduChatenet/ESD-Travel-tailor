/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";

import { Layout } from "@/components/layout";
import { Carousel } from "@/components/carousel";
import { HomeSection } from "@/components/home/homeSection";

const Home: NextPage = () => {
  return (
    <Layout
      title={
        "Personalized Travel Management: Create Your Perfect Journey | Travel Tailor"
      }
      description={
        "Discover an innovative travel management platform that empowers you to curate your ideal journey based on your unique preferences. Create customized itineraries and explore a wide range of activities tailored to your tastes. Start planning your dream vacation today with our intuitive travel planner."
      }
    >
      <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
        <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
          <Carousel />
          <HomeSection
            image="grapy-booking.png"
            title="An innovative solution"
            description="Our travel management project is a groundbreaking website that revolutionizes the way people plan their trips. By allowing users to input their preferences, the site generates personalized itineraries tailored to their tastes and the duration of their journey. This innovative solution takes the guesswork out of travel planning, providing users with carefully curated recommendations that guarantee a memorable experience."
          />
          <HomeSection
            image="blueberry-business-planning-and-time-management.png"
            title="Activities adapted to the tastes of the user"
            description="Our travel management website is designed to cater to the unique preferences of every user, ensuring a personalized and tailored experience. By allowing users to input their interests and preferences, our site generates a customized itinerary that aligns perfectly with their tastes. Whether it's exploring historical landmarks, indulging in culinary delights, or seeking thrilling adventures, our platform curates a range of activities that resonate with the user's desires, making their trip truly unforgettable."
          />
          <HomeSection
            image="glow-young-man-with-a-phone-publishing-a-post-on-a-social-network.png"
            title="Highlighted and referenced activities for advertisers"
            description="Our travel management project is an innovative website that allows users to input their preferences, enabling us to offer personalized itineraries based on their interests and the duration of their trip. We curate a wide range of activities, highlighting the best experiences available, and provide valuable exposure for advertisers."
          />
        </section>
      </main>
    </Layout>
  );
};

export default Home;
