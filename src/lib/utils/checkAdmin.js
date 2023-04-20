import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function isNotAdmin(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const result =
    !session ||
    !session.user ||
    !session.user.role ||
    session.user.role !== "admin";

  return result;
}
