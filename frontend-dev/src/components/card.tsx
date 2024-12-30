import { useRef, useState } from 'react';
import { InputBox } from '../Page/signup';
import Button1 from './buttonmain';
import { BACKEND_URL } from '../config';
import axios from 'axios';

interface CardProps {
  onClose: () => void;
  onContentAdded: () => void; 
}

export default function Card({ onClose, onContentAdded }: CardProps) {
  const addlink = useRef<HTMLInputElement | null>();
  const addtype = useRef<HTMLSelectElement | null>(null);
  const addtitle = useRef<HTMLInputElement | null>();

  
  const [type, setType] = useState<string>('');

  async function AddContent() {
    const title = addtitle.current?.value;
    const link = addlink.current?.value;
    const selectedType = addtype.current?.value; 

    const token = localStorage.getItem('jwt');

    try {
      await axios.post(
        BACKEND_URL + "/api/v1/content", 
        {
          title,
          type: selectedType,
          link
        }, 
        {
          headers: {
            'token': token
          }
        }
      );

      onContentAdded();
      onClose();
    } catch (e) {
      console.error("Couldn't add the content");
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Add New Content</h2>
        <button onClick={onClose} className="text-black-500 text-xl">&times;</button>
      </div>

      <InputBox reference={addtitle} type="text" placeholder="Title" />

    
      <div>
        <label className="block text-sm font-semibold mb-2">Type</label>
        <select 
          ref={addtype} 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={type} 
          onChange={(e) => setType(e.target.value)} 
        >
          <option value="">Select Type</option>
          <option value="tweet">Tweet</option>
          <option value="video">Youtube Video</option>
          <option value="document">Document</option>
          <option value="url">URL</option>
        </select>
      </div>

      <InputBox reference={addlink} type="text" placeholder="Link/Text" />
      <Button1 title="Save" Size="lg" onClick={AddContent} />
    </div>
  );
}
