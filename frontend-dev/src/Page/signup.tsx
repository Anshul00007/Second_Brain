import Button1 from '../components/buttonmain';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRef, useState } from 'react';
import { BACKEND_URL } from '../config';
import { motion } from 'framer-motion'; 


interface Details {
  type: string;
  placeholder: string;
  reference?: any;
}

export function InputBox(props: Details) {
  return (
    <div className="mb-4">
      <input
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-16 px-4"
        ref={props.reference}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default function Signup() {
  const UserRef = useRef<HTMLInputElement>();
  const PassRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ message: string, field: string }[]>([]);
  const [loading, setLoading] = useState(false);  

  async function HandleIt(e: React.FormEvent) {
    e.preventDefault();
    const username = UserRef.current?.value;
    const password = PassRef.current?.value;
    setLoading(true); 

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
      });

      if (response.status === 200) {
        alert("You are Signed Up!!, Please Go to Signin");
        navigate('/signin'); 
      }
    } catch (error: any) {
      const responseErrors = error.response?.data.errors || [];
      const message = error.response?.data.message || 'An error occurred';
      //@ts-ignore
      setErrors(prev => [...responseErrors, { message, field: 'general' }]);  

      if (error.response) {
        if (error.response.status === 409) {
          setErrors(prev => [...prev, { message: 'Username already exists!', field: 'username' }]);
        } else if (error.response.status === 400) {
          setErrors(prev => [...prev, { message: 'Invalid username or password!', field: 'form' }]);
        }
      } else {
        setErrors([{ message: 'Network error', field: 'general' }]);
      }
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
    
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
          Welcome to Brainly
        </motion.h2>
        <motion.p 
          className="text-center text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Create your account to get started
        </motion.p>

  
        <InputBox reference={UserRef} type="text" placeholder="Username" />
        <InputBox reference={PassRef} type="password" placeholder="Password" />
        
  
        {errors.length > 0 && (
          <motion.div 
            className="mt-4 text-red-600 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {errors.map((error, index) => (
              <p key={index} className="text-sm">{error.message}</p>
            ))}
          </motion.div>
        )}

  
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button1 
            title={loading ? "Signing Up..." : "Sign Up"}  
            Size="lg"
            //@ts-ignore
            onClick={HandleIt} 
            disabled={loading}  
          />
        </motion.div>
        
        
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>Sign in</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
