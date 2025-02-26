import { VercelResponse } from "@vercel/node";
export default function handler(res: VercelResponse) {
  res.status(200).json({ message: "Hello from the serverless function!" });
}
