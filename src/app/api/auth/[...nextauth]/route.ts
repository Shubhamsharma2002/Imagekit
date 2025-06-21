

import { authOptions } from "@/libs/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);