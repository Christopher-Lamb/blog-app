import React, { FormEvent } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Navbar } from "../components";
import { Form, Input, Label, Button } from "../components/Form";
import { signupUser } from "../utils/userAPI";

interface SignupProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

function isSignupProps(obj: Partial<SignupProps>): obj is SignupProps {
  return (
    "name" in obj &&
    "username" in obj &&
    "email" in obj &&
    "password" in obj &&
    typeof obj.name === "string" &&
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
}

const SignUpPage: React.FC<PageProps> = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let formObj: Partial<SignupProps> = {};

    formData.forEach((value, key) => {
      // console.log({ key, value });
      // Ensure that the key is actually a key of SignupProps
      if (typeof value === "string") {
        formObj[key as keyof SignupProps] = value;
      }
    });

    // Ensure all fields are present
    if (isSignupProps(formObj)) {
      await signupUser(formObj);
      // console.log(formObj);
    } else {
      console.error("Form is incomplete", formObj);
      // Handle incomplete form case (e.g., display a message to the user)
    }
  };
  return (
    <main>
      <Navbar />
      <Form onSubmit={handleSubmit} className="grid gap-2xsmall p-2xsmall py-small sm:p-small md:p-med container xl:max-w-four mx-auto min-h-three bg-white text-black border border-primary mt-med">
        <h3 className="text-medlarge jost">Sign Up</h3>
        {/* Name */}
        <Label label="Name">
          <Input name="name" />
        </Label>
        {/* Username */}
        <Label label="Username">
          <Input name="username" />
        </Label>
        {/* Email */}
        <Label label="Email">
          <Input name="email" />
        </Label>

        {/* Password */}
        <Label label="Password">
          <Input type="password" name="password" />
        </Label>
        <Button className="h-small primary">Create Account</Button>
      </Form>
    </main>
  );
};

export default SignUpPage;

export const Head: HeadFC = () => <title>The Public Post | Sign Up</title>;
