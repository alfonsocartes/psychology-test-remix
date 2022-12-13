import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getQuestion, setPoints } from "../../api/qa_api";
import type { Question } from "../../model/QA_data";

// This is the loader function. It runs on the server and returns the data to the client. Similar to getServerSideProps in Next.js
export async function loader({ request, params }: LoaderArgs) {
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
  console.log("formAnswer", formAnswer);

  const newPoints = formAnswer ? parseInt(formAnswer.toString()) : 0;

  console.log("newPoints", newPoints + "   " + typeof newPoints);

  // Would send a post request to the API to save the points here
  setPoints(newPoints);

  return redirect(`/question/${number + 1}?points=${points + newPoints}`);
}

export default function Questions() {
  // getting data from the loader
  const loaderData = useLoaderData<typeof loader>();
  const question: Question = loaderData.question;

  return (
    <div className="space-y-6">
      <p>{question.text}</p>
      <ul className="space-y-3">
        {question.answers.map((answer, index) => (
          <Form key={index} method="post" className="space-y-4">
            <li>
              <input type="hidden" name="answer" value={answer.points} />
              <button
                type="submit"
                className="bg-zinc-500 px-4 py-2 rounded-lg shadow shadow-zinc-500 hover:shadow-lg hover:bg-zinc-600 text-white"
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
