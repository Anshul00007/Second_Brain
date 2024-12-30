import { ReactElement, useState, useEffect } from "react";
import Button1 from "./buttonmain";
import { SvgsTwitter, SvgsDocuments, SvgsLinks, SvgsYoutube } from "./svgs";
import { useNavigate } from "react-router-dom";

interface SidebarComponent {
  title: string;
  svgs?: ReactElement;
  onFilterSelect: (type: string) => void; 
  onclick?: () => void;
}

export default function SideBar(props: SidebarComponent) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   //@ts-ignore
  const [isMobile, setIsMobile] = useState(false);  
  const navigate = useNavigate();

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {  
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`h-screen ${isSidebarOpen ? "w-64" : "w-8"} left-[-26px] top-0 absolute bg-white rounded-[33px] transition-all duration-300 z-10`}>
    
      {isSidebarOpen && (  
        <div className="absolute left-[55px] top-[60px] text-left text-black text-[24px] font-serif leading-[64px] overflow-hidden">
          <div className="flex items-center space-x-2">
            {props.svgs}
            <span className="truncate">{props.title}</span>
          </div>
        </div>
      )}

      {isSidebarOpen && (  
        <div className="absolute left-[40px] top-[150px] space-y-8">
          <div className="flex items-center">
            <Button1 title="Twitter" Size="md" svgs={<SvgsTwitter />} onClick={() => props.onFilterSelect('tweet')}  className="transition-all duration-300 mt-4 hover:bg-gray-300 hover:scale-105 rounded-md p-8" />
          </div>
          <div className="flex items-center">
            <Button1 title="Videos" Size="md" svgs={<SvgsYoutube />} onClick={() => props.onFilterSelect('video')} className="transition-all duration-300 mt-8 hover:bg-gray-300 hover:scale-105 rounded-md p-8"/>
          </div>
          <div className="flex items-center">
            <Button1 title="Document" Size="md" svgs={<SvgsDocuments />} onClick={() => props.onFilterSelect('document')} className="transition-all mt-12 duration-300 hover:bg-gray-300 hover:scale-105 rounded-md p-8"/>
          </div>
          <div className="flex items-center">
            <Button1 title="Links" Size="md" svgs={<SvgsLinks />} onClick={() => props.onFilterSelect('url')} className="transition-all mt-16 duration-300 hover:bg-gray-300 hover:scale-105 rounded-md p-8"/>
          </div>

          <div className="flex items-center justify-center ">
            {/* @ts-ignore */}
            <Button1 
              title="Logout" 
              Size="md"  
              onClick={() => {
                localStorage.removeItem('jwt');
                navigate("/"); 
              }}
              className="bg-red-600 text-lg text-white mt-96 transition-all duration-300 hover:bg-red-800 hover:scale-105 rounded-md p-8 flex items-center justify-center space-x-2"
            >
              <span className="font-bold">Logout</span>
            </Button1>
          </div>
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className="absolute left-[40px] top-[10px] bg-black text-white rounded-full px-6 py-2 transition-all duration-300 z-20"
      >
        {isSidebarOpen ? "←" : "→"} 
      </button>
    </div>
  );
}
