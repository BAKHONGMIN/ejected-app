import React from "react";
import DisplayText from "./DisplayText";
import "./App.css";

interface User {
  username: string;
  name: string;
}

async function getUserFullname(username: string): Promise<string> {
  try {
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!usersResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const users: User[] = await usersResponse.json();
    const userByName = users.find((user) => {
      return user.username.toLowerCase() === username.toLowerCase();
    });

    return userByName ? userByName.name : "";
  } catch (error) {
    console.error("Error fetching user data:", error);
    return "";
  }
}

function App() {
  return (
    <div className="App">
      <DisplayText getUserFullname={getUserFullname} />
    </div>
  );
}

export default App;
