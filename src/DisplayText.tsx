import React, { useState } from "react";

export default function DisplayText() {
  const [txt, setTxt] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <form>
      <div>
        <label>Enter your name</label>
      </div>
      <div>
        <input
          data-testid="user-input"
          value={txt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTxt(e.target.value)
          }
        />
      </div>
      <div>
        <button
          data-testid="input-submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setMsg(`Welcome to React testing, ${txt}`);
          }}
        >
          Show Message
        </button>
      </div>
      <div>
        <label data-testid="final-msg">{msg}</label>
      </div>
    </form>
  );
}
