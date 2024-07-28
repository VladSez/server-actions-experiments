import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const Header = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-teal-300 to-teal-200 px-3 py-1.5">
      <div className="flex justify-end items-center">
        <div className="space-x-2 mr-3">
          <Link className="underline hover:text-blue-600" href="/">
            RSC
          </Link>
          <Link className="underline hover:text-blue-600" href="/zsa">
            ZSA
          </Link>
          <Link className="underline hover:text-blue-600" href="/hono-rpc">
            Hono RPC
          </Link>
        </div>
        <div className="w-[34.5px] min-h-[35px] flex justify-center items-center">
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <div className="bg-slate-100 animate-pulse rounded-full h-[28px] w-[28px]"></div>
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
};
