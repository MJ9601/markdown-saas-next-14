"use client";
import { useFormState } from "react-dom";
import { Button, Input, Label } from "../../general";
import { handleLoginWithCredentials } from "@/server/controllers";
import ThirdPartySignIn from "../thirdParty";

const initState = {
  message: "",
  errors: undefined,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(
    handleLoginWithCredentials,
    initState
  );

  return (
    <div className="flex flex-col gap-8 ring-1 p-10 rounded-sm ring-slate-800 items-center min-w-[200px] max-w-[450px] mx-auto">
      <form
        action={formAction}
        className="w-full flex flex-col items-center gap-8"
      >
        <h3 className="text-2xl tracking-wide ">Login</h3>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="capitalize  font-[500]">usename</Label>
            <Input name="email" type="email" placeholder="Email..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input name="password" type="password" placeholder="Password..." />
          </div>
          <Button
            variant="outline"
            type="submit"
            className="font-[500] tracking-wide"
          >
            Sign in
          </Button>
        </div>
      </form>
      {state?.message && <p className="text-red-600">{state.message}</p>}
      <hr className="ring-1 ring-slate-800 w-full" />
      <ThirdPartySignIn />
    </div>
  );
}
