// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUser } from "interface/IUser";
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./data";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser[]>
) {
  if (req.method === "POST") {
    data.unshift(req.body);
    res.status(200).json(data);
  } else {
    res.status(200).json(data);
  }
}
