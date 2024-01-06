import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostToken } from "@/services/auth";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "@/hooks/useAuthForm";
import * as z from "zod";
import { toast } from "sonner";

const Login = () => {
  const { form, formSchema } = useAuthForm();

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const postToken = usePostToken({
    onSuccess: (res) => {
      authStore.setState(res);
      navigate("/chatbot");
    },
    onError: (err) => {
      console.error(err?.response?.data?.detail);
      toast.error(err?.response?.data?.detail || "Something went wrong");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    postToken.query.mutate({ ...values });
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 min-w-[370px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={postToken.query.isPending}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Login;
