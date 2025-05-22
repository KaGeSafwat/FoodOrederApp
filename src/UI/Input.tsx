import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  islabel?: string;
  istextarea: "false";
};
type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  islabel?: string;
  istextarea: "true";
};

export default function Input(Props: InputProps | TextareaProps) {
  const { id, placeholder, islabel, istextarea } = Props;
  let cssClass: string =
    "bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 placeholder:text-slate-200";
  if (islabel === "true") {
    cssClass = Props.className || cssClass;
  }

  return (
    <>
      {islabel === "true" && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 "
        >
          {id}
        </label>
      )}

      {istextarea === "true" && (
        <textarea
          id={id}
          {...Props}
          placeholder={placeholder}
          required
          className={cssClass}
        />
      )}

      {istextarea === "false" && (
        <input
          id={id}
          {...Props}
          placeholder={placeholder}
          required
          className={cssClass}
        />
      )}
    </>
  );
}
