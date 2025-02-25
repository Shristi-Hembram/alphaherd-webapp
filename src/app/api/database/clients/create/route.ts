import prismaClient from '../../../../../../prisma';
import { fetchDatabaseId } from '@/utils/fetchBranchDetails';
import { ClientSchema } from '@/schemas/database/clientValidation';
import { NextRequest } from 'next/server';

export const POST=async(req: NextRequest)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const databaseId = await fetchDatabaseId(req.url);
      const body = await req.json();
      const validatedData = ClientSchema.safeParse(body);

      if (!validatedData.success) {
        return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
          status: 422,
        });
      }
      console.log(body)
        const client = await prismaClient.clients.create({
            data:{ 
              ...body,
              DataBaseSection:{
                connect:{
                  id:databaseId
                }
              }
            }
        });
        return new Response(JSON.stringify(client), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
  }