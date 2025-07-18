import { getIndustryInsight } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './components/dashboardView';

const page = async() => {
    const {isOnboarded}=await getUserOnboardingStatus();

    if(!isOnboarded)
    {
        redirect('/onboarding');
    }

    const insights=await getIndustryInsight();
  return (

    <div>
      <DashboardView insights={insights}/>

    </div>
  )
}

export default page