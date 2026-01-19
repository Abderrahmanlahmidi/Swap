import React from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = React.forwardRef(
  (
    { label, name, type = "text", error, icon: Icon, placeholder, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        <label
          htmlFor={name}
          className="text-sm font-medium text-neutral-900 dark:text-neutral-200"
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          )}
          <input
            id={name}
            name={name}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            ref={ref}
            placeholder={placeholder}
            className={`w-full ${Icon ? "pl-10" : "pl-4"} ${
              isPassword ? "pr-10" : "pr-4"
            } py-3 bg-neutral-50 dark:bg-neutral-900 border rounded-xl focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-white ${
              error
                ? "border-red-500"
                : "border-neutral-200 dark:border-neutral-800"
            }`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
