export type ChatCompletionConfig = {
  user_prompt: string;
  temperature?: number;
  sys_prompt?: string;
  model?: string;
  stream?: boolean;
};

export type ChatCompletion = {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  choices: Array<Record<string, any>>;
  created?: string;
  model?: string;
  object?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type ChatModels = Array<{ deployment_id: string; model: string }>;
