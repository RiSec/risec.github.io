import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

const allowed = new Set(["information", "member", "sponsor", "faq", "contact"]);

export async function loader({ params }: LoaderFunctionArgs) {
  const section = params.section ?? "";
  if (!allowed.has(section)) throw new Response("Not Found", { status: 404 });
  return redirect(`/#${section}`);
}

export default function SectionRedirect() {
  return null;
}
