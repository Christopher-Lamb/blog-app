import React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Navbar } from "../components";
import { Form, Input, Label, Button } from "../components/Form";

const LoginPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar />
      <Form className="grid gap-2xsmall p-2xsmall py-small sm:p-small md:p-med container xl:max-w-four mx-auto min-h-three bg-white text-black border border-primary mt-med">
        <h3 className="text-medlarge jost">Login</h3>
        <Label label="Username or Email">
          <Input />
        </Label>
        {/* Password */}
        <Label label="Password">
          <Input />
        </Label>
        <Button className="h-small primary">Login</Button>
        <Link to="/sign-up">
          <span className="text-blue-500 hover:underline hover:text-blue-400">Sign Up</span>
        </Link>
      </Form>
    </main>
  );
};

export default LoginPage;

export const Head: HeadFC = () => <title>Login</title>;
