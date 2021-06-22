import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";

export default interface ContextType {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}
