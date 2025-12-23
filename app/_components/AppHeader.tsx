import Image from "next/image";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { UserIcon } from "@/components/icons/UserIcon";

function AppHeader() {
  const { user } = useUser();

  return (
    <div className="p-4 shadow-sm flex items-center justify-between w-full ">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        <h2 className="font-bold text-lg">WebTrack</h2>
      </div>
      <div className="flex items-center">
        {!user ? (
          <SignInButton mode="modal">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <UserIcon className="w-4 h-4 mr-2" />
              Get Started
            </button>
          </SignInButton>
        ) : (
          <UserButton
          // appearance={{
          //     elements: {
          //         avatarBox: "w-8 h-8"
          //     }
          // }}
          />
        )}
      </div>
    </div>
  );
}

export default AppHeader;
