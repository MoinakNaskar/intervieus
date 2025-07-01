"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {  signInBackend, signUpBackend, } from "@/lib/actions/auth.action";
import FormField from "./FormField";


const authFormSchema = {
  'sign-up': z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
    age: z.preprocess((val) => Number(val), z.number()),
    gender: z.enum(["male", "female", "others"]),
  }),
  'sign-in': z.object({
    email: z.string().email(),
    password: z.string().min(3),
  })
} as const;

type SignUpFormType = z.infer<typeof authFormSchema['sign-up']>;
type SignInFormType = z.infer<typeof authFormSchema['sign-in']>;

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const form = useForm<SignUpFormType | SignInFormType>({
    resolver: zodResolver(authFormSchema[type]),
    defaultValues: type === "sign-up"
      ? { name: "", email: "", password: "", age: 0, gender: "male" }
      : { email: "", password: "" },
  });

  const onSubmit = async (data: any) => {
    console.log("Submit called")
    try {

      if (type === "sign-up") {
        const { name, email, password , age ,gender } = data;
        console.log (data)
        // const userCredential = await createUserWithEmailAndPassword(
        //   auth,
        //   email,
        //   password
        // );

        const result = await signUpBackend({
          name: String(name),
          age: String(age),
          email: String(email),
          password: String(password),
          gender: String(gender)
        });
        console.log(result)
        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;
        console.log(data)
        const response = await signInBackend({
          email,
          password,
        });
        console.log(response)

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">InterVieus</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            {!isSignIn && (
              <FormField
                control={form.control}
                name="age"
                label="Age"
                placeholder="Your age"
                type="number"
              />
            )}

            {!isSignIn && (
              <FormField
                control={form.control}
                name="gender"
                label="Gender"
                type="select"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Others", value: "others" },
                ]}
              />
            )}

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
