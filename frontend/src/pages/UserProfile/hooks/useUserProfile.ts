import { useState, useEffect } from "react";
import { UserProfile } from "../types";

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return { user };
};

