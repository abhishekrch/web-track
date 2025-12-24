import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import WebsiteForm from "./_components/WebsiteForm";

function AddWebsite() {
  return (
    <div className="flex items-center w-full justify-center mt-10">
      <div className="max-w-lg flex flex-col items-start w-full">
        <Button variant={"outline"}>
          <ArrowLeftIcon />
          Dashboard
        </Button>
        <div className="mt-10 w-full">
          <WebsiteForm />
        </div>
      </div>
    </div>
  );
}

export default AddWebsite;
