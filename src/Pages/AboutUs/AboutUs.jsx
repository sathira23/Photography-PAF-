import React from "react";

const AboutUs = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/1640184.jpg')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to MorganMaxwell Photography</h1>
        <p className="text-lg">
        ​Morgan Maxwell Photography is a professional photography service specializing in capturing the essence of couples, families, seniors, and engagements. Based in Utah, Morgan Maxwell offers personalized photo sessions set against the state's stunning natural backdrops. The photographer's style emphasizes authentic, emotive storytelling, aiming to create timeless images that reflect genuine connections and moments.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
