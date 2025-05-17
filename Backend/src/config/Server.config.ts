import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT || 3000


export const FFMPEGPATH = process.env.FFMPEGPATH
if (!FFMPEGPATH) {
  throw new Error('FFMPEGPATH is not set in environment variables');
}