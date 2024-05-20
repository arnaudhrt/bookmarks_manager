import { Button } from "@/components/ui/button";
import { FaRegLightbulb } from "react-icons/fa";

export default function Profile({ setDisableMarks }) {
  return (
    <div>
      <Button variant="outline" size="icon">
        <FaRegLightbulb className="size-5" onClick={() => setDisableMarks((prev) => !prev)} />
      </Button>
    </div>
  );
}
