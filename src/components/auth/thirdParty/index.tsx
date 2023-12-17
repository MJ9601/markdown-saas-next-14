"use client";
import { SiGithub, SiGoogle } from "react-icons/si";
import { Button } from "../../general";
import { handleSignInWithThirdParty } from "@/server/controllers";
import { useFormState } from "react-dom";

export default function ThirdPartySignIn() {
  const [state, formAction] = useFormState(
    handleSignInWithThirdParty,
    undefined
  );
  return (
    <div className="w-full flex flex-col gap-4">
      <form action={formAction} className="w-full">
        <input type="hidden" name="provider" value={"github"} />
        <Button variant="outline" className="w-full">
          <SiGithub size={20} />
          <span className="pl-3 font-[300] hidden sm:block ">
            Sign in with Github
          </span>
        </Button>
      </form>
      <form action={formAction} className="w-full">
        <input type="hidden" name="provider" value={"google"} />
        <Button variant="outline" type="submit" className="w-full">
          <SiGoogle size={20} />
          <span className="pl-3 font-[300] hidden sm:block">
            Sign in with Google
          </span>
        </Button>
      </form>
    </div>
  );
}
