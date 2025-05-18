import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMovie = async(movieId:string)=>{
    const response =await prisma.movie.create({
        data:{
            movieId,
            processingStatus:"PENDING"
        }
    })
    return response;
}

export const updateMovieStatus = async(movieId:string ,status:string)=>{
    const response=await prisma.movie.update({
        where:{
            movieId
        },
        data:{
            processingStatus: status
        }
    });
    return response
}


// export  const findStatus = async(movieId:string)=>{
//     const response =await prisma.movie.findFirst({
//         where:{
//             movieId
//         }
//     })

//     return response;
// }