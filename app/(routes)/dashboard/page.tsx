"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Dashboard() {
  const [websiteList, setWebsiteList] = useState([]);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bol text-xl">My Site </h2>
        <Link href={"/dashboard/new"}>
          <Button> Site</Button>
        </Link>
      </div>
      <div>
        {websiteList.length == 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 p-8 border-2 border-dashed rounded-2xl mt-5">
            <Image
              src={"/website.png"}
              alt="website"
              width={100}
              height={100}
            />
            <h2>You don't have any website added for tracking!</h2>
            <Link href={"/dashboard/new"}>
              <Button className="cursor-pointer">+ Website</Button>
            </Link>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
