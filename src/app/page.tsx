import { redirect } from "next/navigation";

import { ROUTES } from "@/shared";

export default function IndexPage() {
  redirect(ROUTES.welcome);
}
