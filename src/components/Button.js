const Button = ({ buttonType, onClick, children }) => {
  const buttonWidth = buttonType === "submit" ? "w-full" : "";
  return (
    <button
      type={buttonType === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={`${buttonWidth} px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none`}
    >
      {children}
    </button>
  );
};
export default Button;
