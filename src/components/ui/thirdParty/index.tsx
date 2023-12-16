import { SiGithub, SiGoogle } from "react-icons/si";
import { Button } from "../general";

export default function ThirdPartySignIn() {
  return (
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
  );
}
