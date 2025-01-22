import { cookies } from "next/headers";

export async function GET() {
  cookies().set("key", String(Math.random()));

  return new Response(JSON.stringify({ num: Math.random() }));
}
