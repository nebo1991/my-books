import teamPhoto from "../assets/about-us-image.png";

const AboutUsPage = () => {
  return (
    <>
      <div className="flex justify-around my-20 mt-20">
        <div className="mt-14">
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-purple-800 sm:text-7xl ">
            About us
          </h1>
          <p className="mt-4 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 w-[550px]">
            We are passionate about creating an immersive and personalized
            reading experience for book lovers everywhere. Our platform is
            designed to help you discover and explore a vast collection of books
            across all genres, tailored to your unique preferences.
          </p>
        </div>
        <div>
          <img src={teamPhoto} className="w-[500px]" />
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
