import Button from "./Button";

export default function ServicesButtons() {
  return (
    <div className="mt-5 flex justify-center gap-4">
      <Button>Calculator</Button>
      <Button>Chat GPT</Button>
      <Button>Currency Convertor</Button>
      <Button>Google Map</Button>
      <Button>Google Translate</Button>
    </div>
  );
}
