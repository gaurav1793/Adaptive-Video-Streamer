"use client"
import { useEffect, useRef } from "react"
import HLS from 'hls.js'
import { useParams } from "next/navigation"

const page = ()=>{
    const Params = useParams<{videoId:string}>();
    const videoId = Params.videoId;

    const videoref = useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        if(videoId && HLS.isSupported()){
            const hls =new HLS();
            hls.loadSource(`http://localhost:3000/output/${videoId}/master.m3u8`);
            hls.attachMedia(videoref.current!)
        }
    },[videoId])
  return(
  <div className='h-screen w-full bg-gray-200 flex justify-center items-center'>
      <div className='w-full h-4/5 md:h-4/5  md:w-4/5 bg-white shadow-xl rounded-md p-6'>
        <h1 className="mb-2">now streaming {videoId}</h1>
        <video
            ref={videoref}
            controls
            className="h-4/5 w-full shadow-lg bg-black border-2 border-black rounded-lg"
        />
      </div>

    </div>
  )
}

export default page