import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export function LoginForm({ className, ...props }) {
  async function signUpNewUser() {
    console.log("sign up");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: "test2@a.io",
      password: "test@123",
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    if (error) {
      console.log("error in signup", error);
    } else {
      console.log("signup successful", data);
    }
  }

  const signIn = async () => {
    "use server";
    const formdata = new FormData();
    console.log("sign in with google");
    const supabase = createClient();
    const origin = headers().get("origin");
    const { data, error } = await supabase.auth.signInWithPassword(
      {
        email: formdata.get("email"),
        password: formdata.get("password"),
      },
      { redirectTo: `${origin}` }
    );
    if (error) {
      console.log("error in login", error);
    } else {
      console.log("login successful", data);
      return redirect(data.url);
    }
  };

  signUpNewUser();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
