import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Navbar } from "../components";
import { Form, Input, RadioGroup, CheckboxGroup, Select, TextArea } from "../components/FormTEST";

const stringifyDate = () =>
  new Date().toLocaleDateString("en-US", {
    timeStyle: "short",
    weekday: "short", // abbreviated day of the week
    year: "numeric", // numeric year
    month: "short", // abbreviated month name
    day: "numeric", // numeric day of the month
  });

const Test: React.FC<PageProps> = () => {
  const [currentTest, setCurrentTest] = React.useState(0);
  const [pageName, setPageName] = React.useState("");

  const handlePreSubmit = () => {
    localStorage.setItem("email-enum-num", `${currentTest}`);
  };

  React.useEffect(() => {
    let getStoredNum = localStorage.getItem("email-enum-num") || "0";
    const intStoredNum = parseInt(getStoredNum) + 1;
    setCurrentTest(intStoredNum);

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric", // numeric year
      month: "short", // abbreviated month name
      day: "numeric", // numeric day of the month
    });
    setPageName(`Test: ${intStoredNum} | ${date}`);
  }, []);

  return (
    <main>
      <div className="h-large bg-indigo-700 flex justify-center items-center">
        <h1 className="text-one font-bold text-white">TEST PAGE</h1>
      </div>
      <div className="max-w-four px-4 lg:px-0 mx-auto text-med">Current Test: {currentTest}</div>
      <Form preSubmit={handlePreSubmit} className="grid grid-cols-6 lg:grid-cols-12 gap-2xsmall max-w-four mx-auto py-med px-small bg-gray-50 border shadow-md font-semibold text-stone-800">
        <input type="hidden" name="page" defaultValue={pageName} />
        <Input label="First Name" className="col-span-12 lg:col-span-6" defaultValue={"Johnny"} />
        <Input label="Last Name" className="col-span-12 lg:col-span-6" defaultValue={"Monk"} />
        <Input label="Email" className="col-span-12" defaultValue={"JohnnyMonk@gmail.com"} />
        <RadioGroup defaulted className="w-full grid grid-cols-1 lg:grid-cols-2 col-span-12 lg:col-span-6" label="Radio Group" options={["Option 1", "Option 2", "Option 3", "Option 4"]} />
        <CheckboxGroup
          selected={[0, 3]}
          className="w-full grid grid-cols-1 lg:grid-cols-2 col-span-12 lg:col-span-6"
          label="Checkboxes"
          options={["Checkbox 1", "Checkbox 2", "Checkbox 3", "Checkbox 4"]}
        />
        <Select label="Rating" className="col-span-12" options={["Amazing", "Very Good", "Good", "Ok", "Not Bad", "Bad", "Terrible"]} />
        <TextArea label="Message?" className="col-span-12" defaultValue={"This was a good test. :)"} />
        <button type="submit" className="col-span-6 bg-indigo-600 text-white py-2xsmall rounded ">
          Submit
        </button>
      </Form>
    </main>
  );
};

export default Test;

export const Head: HeadFC = () => <title>TEST!</title>;
