import Header from '../../components/Header';

export default function About() {
  
  return (
    <div>
    <Header/>
      <div className="py-16 bg-white">
     
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                       DreamLine
                      </h2>
                      <p className="mt-6 text-gray-600">
                      we are passionate about helping you find your dream home. As a top-tier real estate agency, we specialize in the buying and selling of residential and commercial properties in the most sought-after locations. Our dedicated team of professionals is committed to providing outstanding service, ensuring that your real estate journey is both enjoyable and successful.
                      </p>
                      <p className="mt-4 text-gray-600">
                      We understand that every dream home is unique, and that's why we go beyond just buying and selling. We also offer bespoke home-building services, tailoring each detail to your preferences. Whether you're looking to purchase an existing property or build a custom home from the ground up, we're here to make your vision a reality.
                      </p>
                  </div>
              </div>
          </div>
      </div>
      </div>
  );
}