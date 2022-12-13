import type { Question } from "../model/QA_data";
import { QUESTIONS_DATA } from "../model/QA_data";

export function getQuestion(index: number): Question | null {
  // this would fetch the question from a DB or API

  // For example:

  // try {
  //   const response = await fetch(
  //     `${process.env.API_URL}/questions/${index}`
  //   );
  //   if (response.ok) {
  //     const { data } = await response.json();
  //     return {
  //       status: 200,
  //       data,
  //     };
  //   } else {
  //     const { message } = await response.json();
  //     return {
  //       status: response.status,
  //       message: message ?? "Error getting questions.",
  //     };
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     status: 500,
  //     message:
  //       (error as Error).message ??
  //       "Failed calling get questions API.",
  //   };
  // }

  return QUESTIONS_DATA[index] ?? null;
}

export function setPoints(newPoints: number) {
  // this would fetch from a DB or API using a PUT request with a user ID

  // For example:

  // try {
  //   const accessToken = await getValidAccessToken(request);
  //   const response = await fetch(
  //     `${process.env.API_URL}/points/${userId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // prettier-ignore
  //         "Authorization": `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({ newPoints }),
  //     }
  //   );
  //   if (response.ok) {
  //     const { data } = await response.json();
  //     return {
  //       status: 200,
  //       data,
  //     };
  //   } else {
  //     const { message } = await response.json();
  //     return {
  //       status: response.status,
  //       message: message ?? "Error getting updated points.",
  //     };
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     status: 500,
  //     message:
  //       (error as Error).message ?? "Failed calling update user points API.",
  //   };
  // }

  console.info("saved to DB: ", newPoints);
}
