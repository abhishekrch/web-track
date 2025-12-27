"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GlobeIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function WebsiteForm() {
  const [domain, setDomain] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [enableLocalhostTracking, setEnableLocalhostTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const websiteId = crypto.randomUUID();
      const result = await axios.post("/api/website", {
        websiteId,
        domain,
        timeZone,
        enableLocalhostTracking,
      });
      toast.success("Website added successfully!");
      router.push(
        "/dashboard/new?step=script&websiteId=" +
          result.data.websiteId +
          "&domain=" +
          result.data.domain,
      );
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.error || "Failed to add website";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle> Add a new Website </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <form className="mt-5" onSubmit={(e) => onFormSubmit(e)}>
            <Label className="text-sm">Domain</Label>
            <InputGroup>
              <InputGroupInput
                type="text"
                placeholder="example.com"
                required
                onChange={(e) => {
                  const val = e.target.value;
                  setDomain(val.startsWith("http") ? val : "https://" + val);
                }}
              />
              <InputGroupAddon>
                <GlobeIcon />
                <span>https://</span>
              </InputGroupAddon>
            </InputGroup>
            <div className="mt-3">
              <Label className="text-sm">Timezone</Label>
              <Select required onValueChange={(value) => setTimeZone(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">
                      Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="cst">
                      Central Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="mst">
                      Mountain Standard Time (MST)
                    </SelectItem>
                    <SelectItem value="pst">
                      Pacific Standard Time (PST)
                    </SelectItem>
                    <SelectItem value="akst">
                      Alaska Standard Time (AKST)
                    </SelectItem>
                    <SelectItem value="hst">
                      Hawaii Standard Time (HST)
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Europe & Africa</SelectLabel>
                    <SelectItem value="gmt">
                      Greenwich Mean Time (GMT)
                    </SelectItem>
                    <SelectItem value="cet">
                      Central European Time (CET)
                    </SelectItem>
                    <SelectItem value="eet">
                      Eastern European Time (EET)
                    </SelectItem>
                    <SelectItem value="west">
                      Western European Summer Time (WEST)
                    </SelectItem>
                    <SelectItem value="cat">
                      Central Africa Time (CAT)
                    </SelectItem>
                    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Asia</SelectLabel>
                    <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                    <SelectItem value="ist">
                      India Standard Time (IST)
                    </SelectItem>
                    <SelectItem value="cst_china">
                      China Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="jst">
                      Japan Standard Time (JST)
                    </SelectItem>
                    <SelectItem value="kst">
                      Korea Standard Time (KST)
                    </SelectItem>
                    <SelectItem value="ist_indonesia">
                      Indonesia Central Standard Time (WITA)
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Australia & Pacific</SelectLabel>
                    <SelectItem value="awst">
                      Australian Western Standard Time (AWST)
                    </SelectItem>
                    <SelectItem value="acst">
                      Australian Central Standard Time (ACST)
                    </SelectItem>
                    <SelectItem value="aest">
                      Australian Eastern Standard Time (AEST)
                    </SelectItem>
                    <SelectItem value="nzst">
                      New Zealand Standard Time (NZST)
                    </SelectItem>
                    <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>South America</SelectLabel>
                    <SelectItem value="art">Argentina Time (ART)</SelectItem>
                    <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                    <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                    <SelectItem value="clt">
                      Chile Standard Time (CLT)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="mt-3 flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(value: boolean) =>
                    setEnableLocalhostTracking(value)
                  }
                />
                <span>Enable localhost tracking in development</span>
              </div>
            </div>
            <div className="mt-5">
              <Button
                className="cursor-pointer w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <PlusIcon className="h-4 w-4" />
                )}
                Add Website
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default WebsiteForm;
