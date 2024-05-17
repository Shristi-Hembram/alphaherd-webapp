import { connectToDB } from '../../../../../utils/index';
import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';


export  const GET=async (req: Request)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
}
    try {
      const databaseId = await fetchDatabaseId();
        await connectToDB();
        const clients = await prismaClient.clients.findMany({
          where:{
            databaseSectionId:databaseId
          },
          include:{
            patients:true
          }
        });
        return new Response(JSON.stringify(clients), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      return new Response("Internal server error",{status:500});
    } finally {
        await prismaClient.$disconnect();
    }
  }
  