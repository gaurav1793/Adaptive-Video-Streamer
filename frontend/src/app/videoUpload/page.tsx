"use client"
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

const VideoUpload = () => {
  const [videoUrl,setVideoUrl] = useState<string|null>(null);
  const [file, setFile] = useState<Blob | string>('');

  useEffect(()=>{
    if(videoUrl){
      const x= setInterval(() => {
      }, 1000);
    console.log("m chla");}
  },[videoUrl])

  async function handleFileUplaod(e:ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];
    if(!file){
      console.log('no file selected')
      return;
    }
    console.log(file);
    setFile(file);
  }

  async function handleUplaod(){
    try {
      const formData = new FormData();
      formData.append("video",file);
      const response = await axios.post('http://localhost:3000/api/v1/videos/upload',formData,
        {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      )
      setFile('');
      console.log(response.data.data.split('/')[1]);
      setVideoUrl(response.data.data.split('/')[1]);

    } catch (error) {
      console.log('something went wrong : ',error)
    }
  }
  return (
    <div className='h-screen w-full bg-gray-200 flex justify-center items-center'>
      <div className='w-4/5 h-2/5  md:w-2/5 bg-white shadow-xl rounded-md p-6'>
        <h1>Upload your file</h1>
        <input
          type="file"
          onChange={handleFileUplaod}
          className='h-2/3 bg-gray-300 w-full shadow-lg rounded p-2 mt-2 file:bg-blue-500 file:rounded-lg file:p-2  '
        />
        <button onClick={handleUplaod} className='bg-gray-500 rounded-lg p-2 mt-4 '>upload</button>
      </div>
      
      <div>
        
      </div>
        {/* {redirect('/join')} */}
    </div>
  )
}

export default VideoUpload