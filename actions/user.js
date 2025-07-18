"use server"

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"
import { generateIndustryInsight, getIndustryInsight } from "./dashboard";

export async function updateUser(data)
{
    const user=await currentUser();
    if(!user)
    {
        throw new Error("Unauthorized");
    }
    const checkuser=await db.user.findUnique({
        where:
        {
            clearkUserId:user.id
        }
    })

    if(!checkuser)
    {
        throw new Error("User not found");
    }

    try
    {
        // A transaction in Prisma (and in any database system)
        //  is a way to group multiple operations together
        //so that they either all succeed or all fail — 
        // keeping your database consistent. 

        /*
        1)find if industry exist
        2)if doesn`t then create it
        3)update the user
         */
        const result=await db.$transaction(
            async(tx)=>{
                
                let industryInsight=await tx.IndustryInsight.findUnique({
                   where: {
                        industry:data.industry
                    },
                })

                if(!industryInsight)
                {
                    const insights=await generateIndustryInsight(data.industry);
      
                    industryInsight=await tx.industryInsight.create({
                              data:
                              {
                                  industry:data.industry,
                                  ...insights,
                                  nextupdate:new Date(Date.now()+7*24*60*60*3600)
                              }
                          })
                }
                const updatedUser=await tx.user.update(
                    {
                        where:
                        {
                            id:checkuser.id
                        },
                        data:
                        {
                            industry:data.industry,
                            experience:data.experience,
                            bio:data.bio,
                            skills:data.skills
                        }
                    }
                )

                return {updatedUser,industryInsight};

            },
            {
                timeout:10000
            }
        )
        return {success:true,...result}
    }
    catch(e)
    {
        console.log(e.message)
        throw new Error("Error in updating user"+e.message)
    }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clearkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clearkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}