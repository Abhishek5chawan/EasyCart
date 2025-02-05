
import { useEffect, useState } from "react";

export const Greeting = ({ username = "Guest" }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-4xl font-bold tracking-tight">
        <span className="text-muted-foreground">{greeting},</span>{" "}
        <span>{username}</span>
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Welcome back to your personal shopping experience.
      </p>
    </div>
  );
};
