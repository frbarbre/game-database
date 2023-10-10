"use client";

import { useState } from "react";

export default function Search({ searchParams }) {
  const [input, setInput] = useState(searchParams.search || "");

  function handleSubmit(e) {
    e.preventDefault();
    window.location.href = `/?search=${input}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center justify-center pt-10"
    >
      <input
        type="text"
        placeholder="Search for a game"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border py-2 px-4 border-sm"
      />
    </form>
  );
}
