export default function Input({
  placeholder,
  id,
  isLabel,
  isTextArea,
  ...Props
}) {
  let cssClass =
    "bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150";
  if (isLabel) {
    cssClass = Props.className;
  }
  return (
    <>
      {isLabel && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {id}
        </label>
      )}

      {isTextArea && (
        <textarea
          id={id}
          {...Props}
          placeholder={placeholder}
          required
          className={cssClass}
        />
      )}
      {!isTextArea && (
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
