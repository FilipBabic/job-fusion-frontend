const Button = ({ buttonType, onClick, children }) => {
  const buttonWidth = buttonType === "submit" ? "w-full" : "";
  return (
    <button
      type={buttonType === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={`${buttonWidth} mx-1 px-4 py-2 bg-blue-700 text-white rounded disabled:bg-violet-300`}
    >
      {children}
    </button>
  );
};
export default Button;
