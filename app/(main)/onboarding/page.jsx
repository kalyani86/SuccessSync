import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import React from 'react'
import OnbordingForm from './components/onbordingForm';
import { industries } from '@/data/industries';

const onBordingpage = async() => {

  const {isOnboarded}=await getUserOnboardingStatus();

  if(isOnboarded)
  {
    redirect('/dashboard');
  }
  return (
    <div>
      <OnbordingForm industries={industries}/>
    </div>
  )
}

export default onBordingpage