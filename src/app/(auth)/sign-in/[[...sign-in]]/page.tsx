import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16 lg:pt-0">
          <h1 className="font-bold text-3xl text-slate-800">Welcome Back!</h1>
          <p className="text-base text-slate-700">
            Log in or Create account to get back to your dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader className="animate-spin text-slate-700" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-teal-600 hidden lg:flex items-center justify-center">
        {/* Source: https://logoipsum.com/*/}
        <Image src="/logo.svg" alt="" height={100} width={100} />
      </div>
    </div>
  );
}
