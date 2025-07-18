
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
 const checkUser=async()=>
{
    const user=await currentUser();
    if(!user)
    {
        return null;
    }
  //  console.log(user)
    try
    {
        const loggedInuser=await db.user.findUnique({
            where:
            {
                clearkUserId:user.id
            }
        })
       // console.log("logged user:",loggedInuser)
        if(loggedInuser)
        {
            return loggedInuser;
        }
        const newuser=await db.user.create({
            data:
            {
                clearkUserId:user.id,
                name:user.firstName,
                email:user.emailAddresses[0].emailAddress,
                imageUrl:user.imageUrl,
                
            }
        })
     //   console.log("newuser:",newuser)
        return newuser;
    }
    catch(e)
    {
        console.log(e);
    }
}
export default checkUser