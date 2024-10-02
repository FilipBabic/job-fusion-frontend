const Button = ({ buttonType, onClick, children }) => {
  const buttonWidth = buttonType === "submit" ? "w-full" : "";
  return (
    <button
      type={buttonType === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={`${buttonWidth} mx-1 px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-800`}
    >
      {children}
    </button>
  );
};
export default Button;
