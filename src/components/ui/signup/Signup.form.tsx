"use client";
import { Button, Input, Label } from "../general";
import { SiGithub, SiGoogle } from "react-icons/si";

export default function SignupForm() {
  return (
    <form className="flex mx-auto flex-col gap-8 ring-1 p-10 rounded-sm ring-slate-800 items-center min-w-[200px] max-w-[450px]">
      <h3 className="text-2xl tracking-wide ">Sign Up</h3>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="capitalize  font-[500]">usename</Label>
          <Input name="username" type="email" placeholder="Email..." />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input name="password" type="password" placeholder="Password..." />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Password..."
          />
        </div>
        <Button
          variant="outline"
          type="submit"
          className="font-[500] tracking-wide"
        >
          Sign up
        </Button>
      </div>
      <hr className="ring-1 ring-slate-800 w-full" />
      <div className="w-full flex flex-col gap-4">
        <Button variant="outline">
          <SiGithub size={20} />
          <span className="pl-3 font-[300] hidden sm:block ">
            Sign in with Github
          </span>
        </Button>
        <Button variant="outline">
          <SiGoogle size={20} />
          <span className="pl-3 font-[300] hidden sm:block">
            Sign in with Google
          </span>
        </Button>
      </div>
    </form>
  );
}
