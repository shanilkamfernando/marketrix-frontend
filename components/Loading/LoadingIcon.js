import React from "react";
import spinner from '@/public/images/live/spinner.gif'
import Image from "next/image"; 

function LoadingIcon({ loaidngMessage }) {
  return (
    <div className=" flex pt-3 items-center justify-center">
      <Image src={spinner} width={15} height={15} alt="spin"/>
      <span className="ml-1 mtx-subtitle2">{loaidngMessage}...</span>
    </div>


  )
}

export default LoadingIcon;
