import React from "react"

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className="border px-4 py-2 rounded w-full" {...props} />
}
