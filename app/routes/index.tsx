import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="space-y-6 flex flex-col">
      <h1 className="text-3xl font-bold">Welcome to Psychology Test</h1>
      <h4 className="text-lg">Are you an introvert or an extrovert?</h4>
      <Link to="/question/0">
        <button className="bg-indigo-500 shadow-indigo-300 shadow-md hover:bg-indigo-400 text-white px-4 py-2 rounded-lg">
          Start
        </button>
      </Link>
    </div>
  );
}
