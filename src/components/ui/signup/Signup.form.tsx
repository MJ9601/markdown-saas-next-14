"use client";
import { useFormState } from "react-dom";
import { Button, Input, Label } from "../general";
import { SiGithub, SiGoogle } from "react-icons/si";
import { AuthProvider, Role, createNewUser } from "@/server/services/users";

export default function SignupForm() {
  const handleCreateNewUser = async (formData: any) => {
    const { name, email, password, confirmPassword } =
      Object.fromEntries(formData);
    console.log(Object.fromEntries(formData));

    if (password !== confirmPassword)
      return "Error: password and confirmPassword don't match!!";

    const newUser = await createNewUser({
      access: Role.normal,
      authProvider: [AuthProvider.credentials],
      email,
      name,
      password,
    });
    console.log(newUser);
    return newUser;
  };
  const [state, formAction] = useFormState(handleCreateNewUser, undefined);
  return (
    <form
      action={handleCreateNewUser}
      className="flex mx-auto flex-col gap-8 ring-1 p-10 rounded-sm ring-slate-800 items-center min-w-[200px] max-w-[450px]"
    >
      <h3 className="text-2xl tracking-wide ">Sign Up</h3>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="capitalize  font-[500]">name</Label>
          <Input name="name" type="text" placeholder="Email..." />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="capitalize  font-[500]">Email</Label>
          <Input name="email" type="email" placeholder="Email..." />
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
