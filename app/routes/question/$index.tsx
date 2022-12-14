import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getQuestion, setPoints } from "../../api/qa_api";
import type { Question } from "../../model/QA_data";

// Since we are using a DB, I'll use the URL to save state: points

// This is the loader function. It runs on the server and returns the data to the client. Similar to getServerSideProps in Next.js
export async function loader({ request, params }: LoaderArgs) {
  // Getting the query parameters from the URL (in this case the points)
  const url = new URL(request.url);
  const pointsParam = url.searchParams.get("points");
  const points = pointsParam ? parseInt(pointsParam) : 0;

  const { index } = params;
  if (!index) {
    return new Response("No index provided", { status: 404 });
  }
  const number = parseInt(index);

  // Getting data from the database (in memory for this example)
  const question: Question | null = getQuestion(number);

  if (!question) {
    return redirect(`/result?questions=${number}&points=${points}`);
  }

  // Returning the data to the client
  return json({ question });
}

// This function runs on the server and handles mutations (in this case the form submission)
export async function action({ request, params }: ActionArgs) {
  const url = new URL(request.url);
  const pointsParam = url.searchParams.get("points");
  const points = pointsParam ? parseInt(pointsParam) : 0;

  const { index } = params;
  if (!index) {
    return new Response("No index provided", { status: 404 });
  }
  const number = parseInt(index);

  const form = await request.formData();
  const formAnswer = form.get("answer");

  const newPoints = formAnswer ? parseInt(formAnswer.toString()) : 0;

  // Would send a post request to the API to save the points here
  setPoints(newPoints);

  // Since we are using a DB, I'll use the URL to save state: points
  return redirect(`/question/${number + 1}?points=${points + newPoints}`);
}

export default function Questions() {
  // getting data from the loader
  const loaderData = useLoaderData<typeof loader>();
  const question: Question = loaderData.question;

  return (
    <div className="space-y-6 flex flex-col">
      <p>{question.text}</p>
      <ul className="space-y-3">
        {question.answers.map((answer, index) => (
          <Form key={index} method="post" className="space-y-4">
            <li>
              <input type="hidden" name="answer" value={answer.points} />
              <button
                type="submit"
                className="bg-zinc-500 px-4 py-2 rounded-lg shadow shadow-zinc-300 hover:shadow-lg hover:bg-zinc-600 text-white"
              >
                {answer.text}
              </button>
            </li>
          </Form>
        ))}
      </ul>
    </div>
  );
}
