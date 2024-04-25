import { Button } from "@/components/ui/button";
import { IoPerson } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button variant="outline" size="icon" onClick={() => loginWithRedirect()}>
        <IoPerson className="size-5" />
      </Button>
    </div>
  );
}
