
export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-2 font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
