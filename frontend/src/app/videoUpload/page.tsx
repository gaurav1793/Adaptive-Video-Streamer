"use client"
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


const VideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [file, setFile] = useState<Blob | string>('');
  const router = useRouter();
  const [loader,setLoader]=useState<Boolean>(false);

  async function check(id: number | NodeJS.Timeout) {
    const response = await axios.get(`http://localhost:3000/api/v1/videos/check/${videoUrl}`);
    console.log(response);
    if (response?.data?.data?.processingStatus === 'COMPLETED') {
      clearInterval(id);
      console.log("helo bhai ho gya complete"
      )
      console.log(videoUrl);
      router.push(`/stream/${videoUrl}`)
    }
  }
  useEffect(() => {
    if (videoUrl) {
      const x = setInterval(() => {
        check(x);
      }, 2000);
      console.log("m chla");
    }
  }, [videoUrl])

  async function handleFileUplaod(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('no file selected')
      return;
    }
    console.log(file);
    setFile(file);
  }

  async function handleUplaod() {
    try {
      const formData = new FormData();
      formData.append("video", file);
      const response = await axios.post('http://localhost:3000/api/v1/videos/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      setFile('');

      setVideoUrl(response.data.data.split('/')?.[1]);
      setLoader(true);

    } catch (error) {
      console.log('something went wrong : ', error)
    }
  }
  return (
    <div className='h-screen w-full bg-gray-200 flex  justify-center items-center '>
      { loader ?
        <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
          <li className="flex items-center">
            <svg className="w-4 h-4 me-2 text-green-500 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Upload your file to our website
          </li>
          <li className="flex items-center">
            <div role="status">
              <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
              <span className="sr-only">Loading...</span>
            </div>
            Preparing your file
          </li>
        </ul>
      :
      <div className='w-4/5 h-2/5  md:w-2/5 bg-white shadow-xl rounded-md p-6'>
        <h1>Upload your file</h1>
        <input
          type="file"
          onChange={handleFileUplaod}
          className='h-2/3 bg-gray-300 w-full shadow-lg rounded p-2 mt-2 file:bg-blue-500 file:rounded-lg file:p-2  '
        />
        <button onClick={handleUplaod} className='bg-gray-500 rounded-lg p-2 mt-4 '>upload</button>
      </div>}
    </div>
  )
}

export default VideoUpload