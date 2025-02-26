import React from "react";
import { createClient } from "../utils/supabase/server";
import { SignupPage } from "@/components/signup";


const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
       <SignupPage/>
      </div>
    </div>
  );
};

export default LoginPage;
