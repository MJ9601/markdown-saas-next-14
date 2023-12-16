import { SiGithub, SiGoogle } from "react-icons/si";
import { Button } from "../general";
import { handleSignInWithThirdParty } from "@/server/controllers";
import { AuthProvider } from "@/server/services/users";

export default function ThirdPartySignIn() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        variant="outline"
        onClick={async () =>
          await handleSignInWithThirdParty(AuthProvider.github)
        }
      >
        <SiGithub size={20} />
        <span className="pl-3 font-[300] hidden sm:block ">
          Sign in with Github
        </span>
      </Button>
      <Button
        variant="outline"
        onClick={async () =>
          await handleSignInWithThirdParty(AuthProvider.google)
        }
      >
        <SiGoogle size={20} />
        <span className="pl-3 font-[300] hidden sm:block">
          Sign in with Google
        </span>
      </Button>
    </div>
  );
}
