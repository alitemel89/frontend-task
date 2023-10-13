import InfiniteTokenGenerator from "./components/InfiniteTokenGenerator";
import SingleTokenGenerator from "./components/SingleTokenGenerator";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <SingleTokenGenerator />
      <InfiniteTokenGenerator />
    </div>
  );
}
