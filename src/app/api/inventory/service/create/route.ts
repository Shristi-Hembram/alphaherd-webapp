import { connectToDB } from '../../../../../utils/index';
import prisma from '../../../../../../prisma';
import { Inventory, type Services } from "@prisma/client";
import { ServiceSchema } from '@/schemas/inventory/serviceValidation';
import { fetchInventoryId } from '@/utils/fetchBranchDetails';


export const POST=async(req: Request)=> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed',{status:405});
} 
    try {
      const {source,...body}  = await req.json();
      console.log(body)
      const validatedData = ServiceSchema.safeParse(body);
       console.log(validatedData.error)
      if (!validatedData.success) {
        return new Response(JSON.stringify({ errors: validatedData.error.issues }), {
          status: 422,
        });
      } 
      const inventoryId=await fetchInventoryId();

        await connectToDB();
        const service = await prisma.services.create({
            data: {...body,
              InventorySection:{
                connect:{id:inventoryId}
              }},
      
        });
        const inventory= await prisma.inventoryTimeline.create({
          data:{
            quantityChange:body.quantity,
            invoiceType:source,
            inventoryType:Inventory.Service,
            service:{
              connect:{
                id:service.id
              }
            },
            InventorySection:{
              connect:{
                id:inventoryId
              }
              }
            
          }
        })
        return new Response(JSON.stringify({service,inventory}), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prisma.$disconnect();
    }
  }