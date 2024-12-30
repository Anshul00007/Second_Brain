import { ReactElement } from "react";

interface Declaration {
  title: string;
  Size: "lg" | "sm" | "md";
  svgs?:ReactElement
 onClick?:()=>void
 className?:string
 
}

const topStyle = {
  "lg": "bg-purple-200 text-xl h-10 p-8 m-8 rounded-lg text-white flex items-center justify-center pr-16",
  "sm": "bg-purple-600 text-lg h-8 p-7 m-8 rounded-lg text-white flex items-center justify-center",
  "md": "bg-white-800 text-md h-8 p-3 rounded-lg text-black flex items-center justify-center"
}

export default function Button1(props: Declaration) {
  

  return (
    <div className={topStyle[props.Size]}>
      <button  onClick={props.onClick} className={`min-w-[150px] h-full flex items-center justify-center text-center ${props.className}`}>
        <span className="mr-4">
        {props.svgs}
        
        </span>
        {props.title}
      </button>
    </div>
  )
}









