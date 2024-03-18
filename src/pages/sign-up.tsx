import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Navbar } from "../components";
import { Form, Input, Label, Button } from "../components/Form";

const SignUpPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar />
      <Form className="grid gap-2xsmall p-2xsmall py-small sm:p-small md:p-med container xl:max-w-four mx-auto min-h-three bg-white text-black border border-primary mt-med">
        <h3 className="text-medlarge jost">Sign Up</h3>
        {/* Name */}
        <Label label="Name">
          <Input />
        </Label>
        {/* Username */}
        <Label label="Username">
          <Input />
        </Label>

        {/* Email */}
        <Label label="Email">
          <Input />
        </Label>

        {/* Password */}
        <Label label="Password">
          <Input />
        </Label>
        <Button className="h-small primary">Create Account</Button>
      </Form>
    </main>
  );
};

export default SignUpPage;

export const Head: HeadFC = () => <title>Sign Up</title>;
