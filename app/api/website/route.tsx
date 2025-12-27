import { db } from "@/configs/db";
import { websiteTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { websiteId, domain, timeZone, enableLocalhostTracking } =
    await req.json();
  const user = await currentUser();

  const existingDomain = await db
    .select()
    .from(websiteTable)
    .where(
      and(
        eq(websiteTable.domain, domain),
        eq(
          websiteTable.userEmail,
          user?.primaryEmailAddress?.emailAddress as string,
        ),
      ),
    );

  if (existingDomain.length > 0) {
    return NextResponse.json(
      { error: "Domain already exists" },
      { status: 400 },
    );
  }

  const result = await db
    .insert(websiteTable)
    .values({
      websiteId,
      domain,
      timeZone,
      enableLocalhostTracking,
      userEmail: user?.primaryEmailAddress?.emailAddress as string,
    })
    .returning();

  return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const result = await db
    .select()
    .from(websiteTable)
    .where(
      eq(
        websiteTable.userEmail,
        user?.primaryEmailAddress?.emailAddress as string,
      ),
    )
    .orderBy(desc(websiteTable.id));

  console.log(result);
  return NextResponse.json(result);
}
