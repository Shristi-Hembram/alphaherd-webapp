// src/api/inventory/getAll.ts
import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma/index';
import { NextRequest } from 'next/server';

export const GET=async(req: NextRequest)=> {
    if (req.method !== 'GET') {
        return new Response('Method not allowed',{status:405});
    }

    // Fetches those orgs and branch mapping in which user is admin or has manager role in some branches

    try {
        const requestHeaders = req.headers;
        console.log(requestHeaders.get("userId"));
        const user = await prismaClient.user.findUnique({
            where: {
                id: Number(requestHeaders.get("userId"))
            },
            include: {
                adminOrganizations: true
            }
        });

        const managerOrgBranchUserRoles = await prismaClient.orgBranchUserRole.findMany({
            where: {
                userId : Number(requestHeaders.get("userId")),
                role: "Manager"
            }
        });

        console.log(managerOrgBranchUserRoles);

        const managerOrgBranchIds = managerOrgBranchUserRoles.map((orgBranchUserRole) => orgBranchUserRole.orgBranchId);

        console.log(managerOrgBranchIds);

        const managerOrgsBranches = await prismaClient.orgBranch.findMany({
            where: {
                id : {
                    in: managerOrgBranchIds
                }
            }
        });

        console.log(managerOrgsBranches);

        const managerOrgIds = managerOrgsBranches.map((orgBranch) => orgBranch.orgId);

        console.log(managerOrgIds);

        const managerOrgs = await prismaClient.organization.findMany({
            where: {
                id: {
                    in: managerOrgIds
                }
            }
        });

        console.log(managerOrgs);

        const managerOrgAndBranchMapping = managerOrgs.map((org) => {
            return {
                ...org,
                allowedBranches : managerOrgsBranches.filter((orgBranch) => orgBranch.orgId==org.id)
            }
        });

        console.log(managerOrgAndBranchMapping);

        const adminOrgAndBranchMapping=[];

        for(const org of user?.adminOrganizations!){
            const orgBranches = await prismaClient.orgBranch.findMany({
                where: {
                    id: org.id
                }
            });
            adminOrgAndBranchMapping.push({
                ...org,
                allowedBranches : orgBranches
            })
        }

        const combinedMapping = [...adminOrgAndBranchMapping,...managerOrgAndBranchMapping.filter((mapping) => !user?.adminOrganizations.find((org) => org.id==mapping.id))];

        return new Response(JSON.stringify(combinedMapping), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error)
      return new Response("Internal server error",{status:500});
    } finally {
        await prismaClient.$disconnect();
    }
  }
  
