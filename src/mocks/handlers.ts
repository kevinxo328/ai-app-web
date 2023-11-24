import { rest } from "msw";
import { getApiUrl } from "@/lib/apiClient.ts";
import { ResChatCompletion } from "@/types/api";

export const handlers = [
  rest.post("/login", (_req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("/user", (_req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),

  rest.post(getApiUrl("/openai/chat_completion"), async (req, res, ctx) => {
    const body = await req.json();
    const text = body?.user_prompt;

    const json: ResChatCompletion = {
      choices: [
        {
          message: {
            content: text,
          },
        },
      ],
    };
    return res(ctx.status(200), ctx.delay(2000), ctx.json(json));
  }),
];
