import Landingpage2 from "../components/types";
import hello from "../assets/download-removebg-preview.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import pic from "../assets/How_to_get_started_using_Cloud_Compute_services.avif";
import pic2 from "../assets/stock-photo-data-science-and-big-data-technology-scientist-computing-analysing-and-visualizing-complex-data-2284126663.jpg";
import pic3 from "../assets/hi.png";
import "../App.css"

export function Navbar() {
  return (
    <div className="w-full h-[70px] bg-gray-800 opacity-80 flex items-center justify-between z-10 relative px-4">
      <div className="text-white  text-2xl">
        <img
          src={hello}
          alt="Logo"
          className="h-36 sm:w-auto w-48 ml-16 sm:ml-4 mt-4 filter brightness-200 contrast-175"
        />
      </div>

      <div className="flex gap-6 absolute sm:relative left-10 sm:left-0 mt-48 sm:mt-0 space-x-4">
        <Link to="/signup">
          <button
            className="bg-purple-200  text-gray font-semibold px-8 py-2 rounded-full transition-all duration-1000 
            hover:scale-105 hover:bg-black hover:animate-spin hover:text-white hover:shadow-lg hover:custom-bounce focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Sign-up
          </button>
        </Link>
        <Link to="/signin">
          <button
            className="bg-purple-400 text-white font-bold px-8 py-2 rounded-full transition-all duration-1000  
            hover:scale-105 hover:bg-gray-500 hover:text-black hover:animate-spin hover:shadow-lg hover:custom-bounce focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign-in
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function Landingpage() {
  return (
    <div className="w-full h-screen relative bg-white">
      <Navbar />
      <img
        className="w-full h-screen left-0 top-0 absolute z-0"
        src="https://img.freepik.com/premium-photo/womans-hands-swiftly-typing-glowing-laptop-keyboard_795422-14493.jpg"
        alt="Landing background"
      />

      <div>
        <div className="hidden md:block w-[40%] h-[50%] left-[75%] top-[70%] absolute opacity-80 bg-gray-500 rounded-[22px] border border-black transform -translate-x-1/2 -translate-y-1/2">
          <Landingpage2 />
        </div>

        <div className="w-[43%] h-[10%] left-[5%] top-[20%] absolute text-center flex flex-col sm:flex-col md:flex-row md:items-start md:justify-start sm:items-center sm:justify-center">
  <motion.span
    className="text-white text=center  whitespace-nowrap text-3xl md:text-7xl sm:ml-8 ml-12 mt-32 sm:mt-8 font-semibold leading-[64px] tracking-widest transition-all duration-500 ease-in-out transform hover:text-blue-600 hover:scale-110 hover:tracking-wider hover:shadow-lg hover:shadow-blue-900"
    style={{ fontFamily: '"Poppins", sans-serif' }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{
      scale: 1.2, 
      rotate: 5,
      color: 'gray', 
      transition: { duration: 0.4, ease: 'easeInOut' }
    }}
  >
    {"Second Brain".split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {char}
      </motion.span>
    ))}
  </motion.span>
</div>

<div className="w-[43%] h-[10%] left-[18%] top-[30%] absolute sm:mt-8 mt-32 ml-28 sm:ml-48 text-center flex flex-col sm:flex-col md:flex-row md:items-start md:justify-start sm:items-center sm:justify-center">
  <motion.span
    className="text-red-100 text-[28px] sm:text-[34px] lg:text-[34px] text-center lg:text-left font-normal leading-[64px] tracking-wide mt-4 sm:mt-2 transition-all duration-500 ease-in-out transform hover:text-gray-500 hover:scale-110 hover:tracking-wider hover:shadow-lg"
    style={{ fontFamily: '"Poppins", sans-serif' }}
  >
    {"By Anshul".split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {char}
      </motion.span>
    ))}
  </motion.span>
</div>

      </div>

      <div className="absolute  whitespace-nowrap top-20 right-1 ml-28 sm:md-8 mt-24 sm:mt-10 mr-20 text-3xl lg:text-5xl font-semibold text-white">
  <motion.div
    className="text-3xl lg:text-5xl font-bold"
    whileHover={{ opacity: 0.7, x: 80 }}
    transition={{ duration: 0.5 }}
  >
    <Link to="/signup">Let's Get Started</Link>
  </motion.div>
</div>


      <div className="hidden md:flex relative bottom-10 mt-96 ml-84 flex flex-row gap-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-[250px] h-[250px] flex flex-col gap-2"
        >
          <motion.img
            src={pic}
            alt="Pic 1"
            className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transform hover:scale-105"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-[250px] h-[250px] flex flex-col gap-2"
        >
          <motion.img
            src={pic2}
            alt="Pic 2"
            className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transform hover:scale-105"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative w-[250px] h-[250px] flex flex-col gap-2"
        >
          <motion.img
            src={pic3}
            alt="Pic 3"
            className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transform hover:scale-105"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>

      
      <footer className="w-full bg-gray-800 text-white py-4 fixed bottom-0 md:relative md:mt-4">
        <div className="container mx-auto text-center">
        <Link to="https://github.com/Anshul00007">
        <p className="text-lg mt-2 tracking-widest" style={{ fontFamily: '"Poppins", sans-serif' }}>About Me</p></Link>
         
        </div>
      </footer>
    </div>
  );
}
