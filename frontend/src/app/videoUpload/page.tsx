"use client"
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'

const VideoUpload = () => {
  const [videoUrl,setVideoUrl] = useState<string|null>(null);

  async function handleFileUplaod(e:ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];
    if(!file){
      console.log('no file selected')
      return;
    }
    console.log(file);
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
    } catch (error) {
      console.log('something went wrong : ',error)
    }
  }
  return (
    <div className='h-screen w-full bg-gray-200 flex justify-center items-center'>
      <div className='w-4/5 h-1/5  md:w-2/5 bg-white shadow-xl rounded-md p-6'>
        <h1>Upload your file</h1>
        <input
          type="file"
          onChange={handleFileUplaod}
          className='h-2/3 bg-gray-300 w-full shadow-lg rounded p-2 mt-2 file:bg-blue-500 file:rounded-lg file:p-2  '
        />
      </div>

    </div>
  )
}

export default VideoUpload