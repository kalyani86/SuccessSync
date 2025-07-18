"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {zodResolver} from "@hookform/resolvers/zod"
import { onboardingSchema } from '@/app/lib/schema'
import { useRouter } from 'next/navigation'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { err } from 'inngest/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import useFetch from '@/app/hooks/use-fetch'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const OnbordingForm = ({industries}) => {

  const [selectedIndustry,setSelectedIndustry]=useState(null);
  const router=useRouter();


  const {
    loading:updateLoading,
    fn:updateUserFn,
    data:updateResult
  }=useFetch(updateUser);

 const {register,handleSubmit,formState:{errors},setValue,watch} = useForm({
    resolver:zodResolver(onboardingSchema),

  });

  const onsubmit=async(values)=>{
  
   try
   {
    const formattedIndustry=`${values.industry}-${values.subIndustry
    .toLowerCase()
    .replace(/ /g,"-")}`;

    await updateUserFn({
      ...values,
      industry:formattedIndustry
    })
   }
   catch(err)
   {
    console.log(err.message);
   }
     
  }

  useEffect(()=>
  {

    if(updateResult?.success && !updateLoading)
    {
      toast.success("profile updated successfully");
      router.push("/dashboard");
      router.refresh();
    }
  },[updateResult,updateLoading])

  const watchIndstry=watch("industry");

  return (
    <div className='flex items-center justify-center my-10'>

    <Card className="w-full max-w-lg mt-10 mx-2">
  <CardHeader className="flex justify-center">
    <CardTitle className="text-4xl gradient-text">Complete your profile</CardTitle>
  </CardHeader>
  <CardContent> 
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className='mb-5'>
        <Label htmlFor="industry" className="mb-5">Industry</Label>
      <Select className=""
      onValueChange={(value)=>
      {
          setValue("industry",value);
          setSelectedIndustry(
            industries.find((ind)=>ind.id===value)
          );
          setValue("subIndustry","")
      }
      }>
        <SelectTrigger id="industry" className="w-full">
          <SelectValue placeholder="select an industry" />
        </SelectTrigger>
        <SelectContent className="bg-gray-500">
        {industries.map((industry)=>
        {
          return <SelectItem value={industry.id} key={industry.id}>{industry.name}</SelectItem>
        })}
        </SelectContent>
      </Select>
      {errors.industry && (
        <p className='text-sm text-red-500'>
          {errors.industry.message}
        </p>
      )}
</div>



 {watchIndstry && (<div className='mb-5'>
        <Label htmlFor="subIndustry" className="mb-5">Specilization</Label>
      <Select 
      onValueChange={(value)=>
      {
          setValue("subIndustry",value);

      }
      }>
        <SelectTrigger id="subIndustry" className="w-full">
          <SelectValue placeholder="select an subIndustry" />
        </SelectTrigger>
        <SelectContent className="bg-gray-500">
        {selectedIndustry?.subIndustries.map((industry)=>
        {
          return <SelectItem value={industry} key={industry}>{industry}</SelectItem>
        })}
        </SelectContent>
      </Select>
      {errors.subIndustry && (
        <p className='text-sm text-red-500'>
          {errors.subIndustry.message}
        </p>
      )}
</div>)}

 <div className="space-y-2 mb-5">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mb-5">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            <div className="space-y-2 mb-6">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={updateLoading} >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
                
              )}
             
            </Button>
    </form>
  </CardContent>

</Card>
    </div>
  )
}

export default OnbordingForm