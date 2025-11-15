import Redirect from "./components/Redirect";


export default function Home() {
  return (
    <div>
      <Redirect />
      <div>
        <h1 className="text-3xl font-bold underline text-center h-screen">
          Welcome to Book Trackerssss!
        </h1>
      </div>
    </div>
  );
}
