
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  full_name: string | null;
  username: string | null;
}

export const Greeting = () => {
  const [greeting, setGreeting] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user } = useAuth();

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

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name, username')
          .eq('id', user.id)
          .single();
        
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0] || "Guest";

  return (
    <div className="fade-in">
      <h1 className="text-4xl font-bold tracking-tight">
        <span className="text-muted-foreground">{greeting},</span>{" "}
        <span>{displayName}</span>
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Welcome back to your personal shopping experience.
      </p>
    </div>
  );
};
