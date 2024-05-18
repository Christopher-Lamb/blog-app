import React from "react";
function toKebabCase(input: string): string {
  //Removes anything after a comma
  const commaFunc = (string: string) => (string.includes(",") ? string.substring(0, string.indexOf(",")) : string);
  return commaFunc(
    input
      // Convert the string to lowercase
      .toLowerCase()
      //remove any name names
      .replaceAll("name", "")
      //replace any "(text)"
      .replaceAll(/\(.*?\)/g, "")
      //replace trailing spaces
      .replace(/\s+$/, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
  );
}

const inputStyle = "p-2 text-black border font-normal";
const labelStyle = "jost text-lg";

const Form: React.FC<{ children: React.ReactNode; className?: string; id?: string; preSubmit?: () => void }> = ({ children, className, id, preSubmit }) => {
  const getPageName = () => {
    if (typeof window !== "undefined") {
      let pathname = window.location.pathname;
      if (pathname === "/") return "Home";
      pathname = pathname.replaceAll("/", "");
      pathname = pathname
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return pathname;
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    preSubmit && preSubmit();
    e.currentTarget.submit();
  };

  return (
    <form id={id} className={className} action={"https://krispywebsites.com/form"} method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="recipient" value="christopher.j.lamb13@gmail.com" />
      {typeof window !== "undefined" && (
        <>
          <input type="hidden" name="redirect_url" defaultValue={window.location.href} />
          {/* <input type="hidden" name="page" defaultValue={getPageName() + " Page"} /> */}
          <input
            type="hidden"
            name="warning"
            value={
              "Please do not reply directly to this email. If you need to respond, please create a new email and use the customer's email address provided in the form. Any reply sent directly to this email will go to our email service, not the customer"
            }
          ></input>
        </>
      )}
      {children}
    </form>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, ...other }) => {
  const { className, inputClassName, ...inputProps } = other;
  const name = toKebabCase(label);

  return (
    <div className={"w-full " + className}>
      <label htmlFor={name} className={labelStyle}>
        {label} {inputProps.required && <span className="text-red-600">*</span>}
      </label>
      <input id={name} name={name} className={`w-full shadow ${inputClassName} ` + inputStyle} {...inputProps} />
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...other }) => {
  const { className, ...textAreaProps } = other;
  const name = toKebabCase(label);
  return (
    <div className={"w-full h-auto " + className}>
      {label && (
        <label htmlFor={name} className={labelStyle}>
          {label}
          {textAreaProps.required && <span className="text-red-600"> *</span>}
        </label>
      )}
      <textarea id={name} name={name} {...textAreaProps} className={"w-full shadow min-h-[8rem] " + inputStyle} />
    </div>
  );
};

interface SelectProps {
  label: string;
  options: string[];
  selected?: string;
  className?: string;
  requiredText?: string;
  onChange?: (val: string) => void;
}
const Select: React.FC<SelectProps> = ({ label, options, selected, className, requiredText, onChange }) => {
  const name = toKebabCase(label);
  const kebabMap: Record<string, string> = options.reduce((acc: Record<string, string>, option: string) => {
    acc[toKebabCase(option)] = option;
    return acc;
  }, {});

  return (
    <div className={`grid ${className}`}>
      <label htmlFor={name} className={labelStyle}>
        {label} {requiredText && <span className="text-red-600">*</span>}
      </label>
      <select required={!!requiredText} onChange={(e) => onChange && onChange(kebabMap[e.target.value])} id={name} name={name} className={"w-full shadow " + inputStyle}>
        {requiredText && <option value="">{requiredText}</option>}
        {options.map((value, i) => {
          if (value === selected)
            return (
              <option key={i} value={toKebabCase(value)} selected>
                {value}
              </option>
            );
          return (
            <option key={i} value={toKebabCase(value)}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
const FieldSet: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <fieldset className={className}>{children}</fieldset>;
};

interface RadioGroupProps {
  label: string;
  options: string[];
  className?: string;
  onChange?: (val: string) => void;
  required?: boolean;
  defaulted?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, options, className, onChange, required, defaulted }) => {
  return (
    <fieldset className={className}>
      <legend className={"block col-span-full " + labelStyle}>
        {label} {required && <span className="text-red-600">*</span>}
      </legend>
      {options.map((value, i) => (
        <label key={i} className="w-full flex gap-3xsmall">
          <input
            name={toKebabCase(label)}
            defaultChecked={i === 0 && defaulted}
            required={required}
            onChange={() => onChange && onChange(value)}
            className="cursor-pointer"
            value={value}
            type="radio"
          />
          <span className="block text-nowrap">{value}</span>
        </label>
      ))}
    </fieldset>
  );
};

interface CheckboxProps extends RadioGroupProps {
  selected?: number[];
}

export const CheckboxGroup: React.FC<CheckboxProps> = ({ label, options, className, selected = [] }) => {
  return (
    <fieldset className={className}>
      <legend className={"col-span-full " + labelStyle}>{label}</legend>
      {options.map((value, i) => (
        <Checkbox key={i} checked={selected?.includes(i)} label={value} name={toKebabCase(label)} />
      ))}
    </fieldset>
  );
};

export const Checkbox: React.FC<{ label: string; name: string; checked: boolean }> = ({ label, name, checked }) => {
  return (
    <label className="w-full flex gap-3xsmall">
      <input readOnly name={toKebabCase(name)} className="cursor-pointer" value={label} checked={checked} type="checkbox" />
      <span className="block text-nowrap">{label}</span>
    </label>
  );
};

export { Form, Input, TextArea, FieldSet, Select };
