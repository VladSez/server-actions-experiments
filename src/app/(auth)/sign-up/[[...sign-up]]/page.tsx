import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-center justify-center">
            <ClerkLoaded>
              <SignUp path="/sign-up" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader className="animate-spin text-slate-700" />
            </ClerkLoading>
          </div>
        </div>
        <div className="h-full bg-teal-600 hidden lg:flex items-center justify-center">
          {/* Source: https://logoipsum.com/ */}
          <Image src="/logo.svg" alt="" height={100} width={100} />
        </div>
      </div>
    </>
  );
}
