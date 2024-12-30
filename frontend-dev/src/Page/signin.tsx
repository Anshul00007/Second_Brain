import { InputBox } from './signup';
import Button1 from '../components/buttonmain';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState } from 'react';
import { BACKEND_URL } from '../config';
import { motion } from 'framer-motion'; 

export default function Signin() {
  const UserRef = useRef<HTMLInputElement>();
  const PassRef = useRef<HTMLInputElement>();
  const [errorMessage, setErrorMessage] = useState<string>('');  
  const [isLoading, setIsLoading] = useState<boolean>(false);  
  const navigate = useNavigate();

  async function HandleItmore() {
    const username = UserRef.current?.value;
    const password = PassRef.current?.value;

    setIsLoading(true);  

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password
      });

      const jwt = response.data.token;
      localStorage.setItem('jwt', jwt);

      navigate('/dashboard');
    } catch (error: any) {
      setIsLoading(false);  

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong! Please try again later.');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl font-semibold text-center text-indigo-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome Back to Brainly
        </motion.h2>
        <motion.p 
          className="text-center text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Please sign in to continue
        </motion.p>

        <InputBox reference={UserRef} type="text" placeholder="Username" />
        <InputBox reference={PassRef} type="password" placeholder="Password" />
        {errorMessage && (
          <motion.div 
            className="mt-4 text-red-600 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm">{errorMessage}</p>
          </motion.div>
        )}

        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        > 
          <Button1 
            title={isLoading ? "Signing In..." : "Sign In"}  
            Size="lg"
            onClick={HandleItmore} 
            disabled={isLoading}  
          />
        </motion.div>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-sm text-gray-600">
            Not a user?{' '}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign up here</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
