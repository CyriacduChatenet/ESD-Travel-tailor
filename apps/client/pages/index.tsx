/* eslint-disable react/no-unescaped-entities */
import { Layout } from '@/components/layout'
import { CreateTravelForm } from '@/components/traveler/travels/createForm'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout title={'Personalized Travel Management: Create Your Perfect Journey | Travel Tailor'} description={'Discover an innovative travel management platform that empowers you to curate your ideal journey based on your unique preferences. Create customized itineraries and explore a wide range of activities tailored to your tastes. Start planning your dream vacation today with our intuitive travel planner.'}>
      <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
        <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
          <section className='w-full h-96 relative'>
            <div className={`w-full h-96 bg-[url('https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')] -z-20 bg-cover bg-center blur-[1px]`}></div>
            <div className="absolute bottom-0 left-0">
              <span className="text-white text-4xl font-bold uppercase pl-6">Bordeaux</span>
            </div>
          </section>
          <CreateTravelForm />
          <section className='w-full grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 min-h-screen'>
            <section className='col-span-4 md:col-span-8 xl:col-span-12 xl:my-12 grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-8'>
              <div className='w-full col-span-4 md:col-span-8 xl:col-span-8'>
                <h1 className='font-bold text-2xl w-full'>An innovative solution</h1>
                <p className='w-full'>
                  Our travel management project is a groundbreaking website that revolutionizes the way people plan their trips. By allowing users to input their preferences, the site generates personalized itineraries tailored to their tastes and the duration of their journey. This innovative solution takes the guesswork out of travel planning, providing users with carefully curated recommendations that guarantee a memorable experience.
                  <br /> <br />
                  Unlike traditional travel websites that rely on generic suggestions, our platform harnesses the power of advanced algorithms and machine learning to understand each user's unique preferences. Whether it's adventure sports, cultural exploration, or culinary delights, our system analyzes the user's inputs and intelligently crafts a comprehensive itinerary that maximizes their enjoyment and minimizes the hassle of planning. With our travel management project, users can embark on their dream vacations with confidence, knowing that every activity and attraction is handpicked to suit their individual interests. It's a game-changer in the travel industry, delivering unparalleled convenience and personalization to every globetrotter.
                  Our travel management project is a groundbreaking website that revolutionizes the way people plan their trips. By allowing users to input their preferences, the site generates personalized itineraries tailored to their tastes and the duration of their journey. This innovative solution takes the guesswork out of travel planning, providing users with carefully curated recommendations that guarantee a memorable experience.
                  <br /> <br />
                  Unlike traditional travel websites that rely on generic suggestions, our platform harnesses the power of advanced algorithms and machine learning to understand each user's unique preferences. Whether it's adventure sports, cultural exploration, or culinary delights, our system analyzes the user's inputs and intelligently crafts a comprehensive itinerary that maximizes their enjoyment and minimizes the hassle of planning. With our travel management project, users can embark on their dream vacations with confidence, knowing that every activity and attraction is handpicked to suit their individual interests. It's a game-changer in the travel industry, delivering unparalleled convenience and personalization to every globetrotter.
                </p>
              </div>
              <Image src={'https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'} alt={''} width={400} height={400} className='col-span-4 md:col-span-8 xl:col-span-4' />
            </section>
            <section className='col-span-4 md:col-span-8 xl:col-span-12 xl:my-12 grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12'>
              <Image src={'https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'} alt={''} width={400} height={400} className='col-span-4 md:col-span-8 xl:col-span-4' />
              <div className='w-full xl:ml-8 col-span-4 md:col-span-8 xl:col-span-8'>
                <h1 className='font-bold text-2xl w-full'>Activities adapted to the tastes of the user</h1>
                <p className='w-full'>
                  Our travel management website is designed to cater to the unique preferences of every user, ensuring a personalized and tailored experience. By allowing users to input their interests and preferences, our site generates a customized itinerary that aligns perfectly with their tastes. Whether it's exploring historical landmarks, indulging in culinary delights, or seeking thrilling adventures, our platform curates a range of activities that resonate with the user's desires, making their trip truly unforgettable.
                  <br /> <br />
                  With the user's chosen duration of the trip in mind, our website crafts a comprehensive schedule that optimizes their time while encompassing their preferred activities. From sightseeing tours to cultural immersions, each activity is carefully selected to match the user's interests and create a seamless flow throughout their journey. By blending the user's taste with the duration of their travel, our travel management site provides a delightful and tailored experience, ensuring that every moment is a reflection of their unique preferences and creating memories that will last a lifetime.
                </p>
              </div>
            </section>
            <section className='col-span-4 md:col-span-8 xl:col-span-12 xl:my-12 grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12'>
              <div className='w-full col-span-4 md:col-span-8 xl:col-span-8'>
                <h1 className='font-bold text-2xl w-full'>Highlighted and referenced activities for advertisers</h1>
                <p className='w-full'>
                  Our travel management project is an innovative website that allows users to input their preferences, enabling us to offer personalized itineraries based on their interests and the duration of their trip. We curate a wide range of activities, highlighting the best experiences available, and provide valuable exposure for advertisers.
                  <br /> <br />
                  By showcasing activities that align with our users' tastes and desires, we ensure that our recommendations are tailored to their specific needs. Whether it's exploring historical landmarks, indulging in culinary delights, embarking on thrilling adventures, or simply unwinding in serene natural settings, we prioritize activities that resonate with our users' preferences.
                  <br /> <br />
                  For advertisers, our platform offers a unique opportunity to reach a targeted audience of enthusiastic travelers. By featuring their services and products within our recommended itineraries, we provide advertisers with enhanced visibility and the chance to connect with potential customers who are actively seeking relevant experiences. Our focus on personalization and quality ensures that our advertising partners receive maximum exposure to an engaged and receptive audience, making our platform a valuable promotional channel for their offerings.
                </p>
              </div>
              <Image src={'https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'} alt={''} width={400} height={400} className='col-span-4 md:col-span-8 xl:col-span-4' />
            </section>
          </section>
        </section>
      </main>
    </Layout>
  )
}
