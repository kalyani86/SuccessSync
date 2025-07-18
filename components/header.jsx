import checkUser from '@/lib/checkUser'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarIcon, StarsIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'


export const Header = async() => {
  try
  {
    await checkUser();
    
  }
  catch(e)
  {
    console.log(e);
  }
  return (
    <>
   <div className="w-full px-4 bg-background shadow-2xs shadow-amber-50 fixed top-0 left-0 z-50">
  <div className="flex items-center justify-between ">
    {/* Logo + App Name */}
    <div className="flex items-center">
      <Link href="/">
      <Image
        src="/logo3.png"
        alt="Logo"
        width={100}
        height={30}
        className="object-contain"
      />
     </Link>
    </div>

    {/* Auth Buttons */}
    <div className="flex items-center space-x-3 md:space-x-4 ">
   
    
      <SignedIn>
        <Link href="\dashboard">
        <Button>
          {/* lucide is a icon library which contain this layoutDashboard icon */}
            <LayoutDashboard className='h-4 w-4' />
            <span className='hidden md:block'>Industry Insight</span>
        </Button>
        </Link>
      
       <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 mt-3 px-2 py-3 bg-gray-100 text-black rounded-md">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
     </SignedIn>

       <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
    </div>
  </div>
</div>

    
  </>
  )
}
