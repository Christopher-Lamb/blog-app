import React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Navbar } from "../components";
import { Form, Input, Label, Button } from "../components/Form";
import { loginUser, getUsers } from "../utils/apiService";
import { useUserContext } from "../context/UserContext";

interface LoginProps {
  identifier: string;
  password: string;
}

function isLoginProps(obj: Partial<LoginProps>): obj is LoginProps {
  return "identifier" in obj && "password" in obj && typeof obj.identifier === "string" && typeof obj.password === "string";
}

const LoginPage: React.FC<PageProps> = () => {
  const { checkAuthenticated, loginSuccess } = useUserContext();

  const handleBtn = async () => {
    try {
      const users = await getUsers();
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthBtn = () => {
    if (checkAuthenticated) checkAuthenticated();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let formObj: Partial<LoginProps> = {};

    formData.forEach((value, key) => {
      // Ensure that the key is actually a key of LoginProps
      if (typeof value === "string") {
        formObj[key as keyof LoginProps] = value;
      }
    });

    // Ensure all fields are present
    if (isLoginProps(formObj)) {
      const status = await loginUser(formObj);
      if (status === 200 && loginSuccess) {
        loginSuccess();
      }
    } else {
      // console.error("Form is incomplete", formObj);
      // Handle incomplete form case (e.g., display a message to the user)
    }
  };

  return (
    <main>
      <Navbar />
      <button className="p-4 border bg-blue-600 text-white font-semibold tracking-wide  rounded border-4 border-blue-700" onClick={handleBtn}>
        Get Users
      </button>
      <button className="p-4 border bg-blue-600 text-white font-semibold tracking-wide  rounded border-4 border-blue-700" onClick={handleAuthBtn}>
        Get Cookie
      </button>
      <Form onSubmit={handleSubmit} className="grid gap-2xsmall p-2xsmall py-small sm:p-small md:p-med container xl:max-w-four mx-auto min-h-three bg-white text-black border border-primary mt-med">
        <h3 className="text-medlarge jost">Login</h3>
        <Label label="Username or Email" htmlFor="identifier">
          <Input type="text" name="identifier" placeholder="Username or Email" />
        </Label>
        {/* Password */}
        <Label label="Password" htmlFor="password">
          <Input type="password" name="password" placeholder="Password" />
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
