"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/store/zustStore";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/app/(auth)/login/_action";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {  setEmail } = useUser();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const response = await checkLogin(e);
    console.log(response?.res.data);

    console.log(response?.email);

    if (response?.res.data.status === 200) {
      console.log("first");
      setEmail(response?.email as string);
      toast("Login successful", {
        description: `Welcome back, ${response.email}`,
      });
      router.push("/dashboard");
    } else {
      toast("Invalid Credentials", {
        description: "Please try again!",
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="test@test.com"
            required
            className="bg-white"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-white"
            placeholder="password123"
          />
        </div>
        <Button type="submit" className="w-full bg-[#007EFF] hover:bg-[#007EFF]/80 cursor-pointer hover:translate-y-[-3px]">
          Login
        </Button>

      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
