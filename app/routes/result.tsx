import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  // Getting the query parameters from the URL (in this case the points and the number of questions). In a normal app, you would get this from the database.
  const url = new URL(request.url);
  const questionsParam = url.searchParams.get("questions");
  const questions = questionsParam ? parseInt(questionsParam) : 0;
  const pointsParam = url.searchParams.get("points");
  const points = pointsParam ? parseInt(pointsParam) : 0;
  if (questions === 0 || points === 0) {
    return new Response("No questions or points provided", { status: 404 });
  }

  // Calculating the result (all of this whould be done in the server, we only send to the client the least amount of data)
  const result = points / questions > 2;
  const resultText = result ? "You are an extrovert" : "You are an introvert";

  return json({ resultText });
}

export default function Result() {
  const loaderData = useLoaderData<typeof loader>();

  <div className="space-y-6 flex flex-col">
    <h1 className="text-3xl font-bold">Welcome to Psychology Test</h1>
    <h4 className="text-lg">Are you an introvert or an extrovert?</h4>
    <Link to="/question/0">
      <button className="bg-indigo-500 shadow-indigo-300 shadow-md hover:bg-indigo-400 text-white px-4 py-2 rounded-lg">
        Start
      </button>
    </Link>
  </div>;
  return (
    <div className="space-y-6 flex flex-col">
      <h1 className="text-3xl font-bold">Result</h1>
      <h4 className="text-lg">Are you an introvert or an extrovert?</h4>
      <p className="font-bold bg-blue-500 rounded-xl p-8">
        {loaderData.resultText}
      </p>
      <Link to="/question/0">
        <button className="bg-indigo-500 shadow-indigo-300 shadow-md hover:bg-indigo-400 text-white px-4 py-2 rounded-lg">
          Start Again
        </button>
      </Link>
    </div>
  );
}
