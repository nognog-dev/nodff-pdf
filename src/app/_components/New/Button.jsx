export function Button({ 
  children, 
  variant = "solid", 
  icon, 
  className = "", 
  onClick, 
  disabled = false, 
  ...props 
}) {
  const variants = {
    solid: "bg-sky-950 text-sky-50 hover:bg-sky-800 disabled:bg-gray-400 disabled:cursor-not-allowed",
    outline: "border-2 border-sky-950 text-sky-950 hover:bg-sky-100 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed",
    ghost: "text-sky-950 hover:bg-sky-100 disabled:text-gray-400 disabled:cursor-not-allowed"
  };

  return (
    <button
      className={`flex gap-2 items-center justify-center px-6 py-3 rounded-lg text-base font-medium transition-colors ${variants[variant]} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-5 h-5"
        />
      )}
      {children}
    </button>
  );
}
