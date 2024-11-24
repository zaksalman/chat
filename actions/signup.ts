"use server";

import { SignUpForm } from "@/components/auth/SignUpForm";
import { getUserByEmail } from "@/data/user";
import db from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";


export const signUp = async (_:any, formData: FormData ) => {
  
  //1. 필드 검증
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if(!validatedFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다."
    }
  }

  const {name, email, password} = validatedFields.data;

  try {
    const existUser = await getUserByEmail(email);
    if(existUser) {
      return {
        errorMessage: "이미 존재하는 사용자입니다."
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(user).values({name, email, password: hashedPassword});
  }catch(error) {
    console.error("error", error);
    return { errorMessage: "문제가 발생하였습니다."}
  }

  redirect("/login");

}

