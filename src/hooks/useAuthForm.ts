import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAuthForm = () => {
  const formSchema = z.object({
    username: z
      .string()
      .min(5, { message: "帳號至少要 5 個字" })
      .max(20, { message: "帳號最多 20 個字" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "帳號只能是英文或數字" }),
    password: z
      .string()
      .min(8, { message: "密碼至少要 8 個字" })
      .max(30, { message: "密碼最多 30 個字" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "密碼只能是英文或數字",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: "密碼至少要包含一個大寫字母、一個小寫字母和一個數字",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return { form, formSchema };
};
