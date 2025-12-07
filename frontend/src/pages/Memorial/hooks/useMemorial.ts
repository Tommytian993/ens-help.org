import { useState, useEffect } from "react";
import { Memorial } from "../types";

export const useMemorial = () => {
  const [user, setUser] = useState<any>(null);
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Memorial>({
    name: "",
    date: "",
    message: "",
    author: "",
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      setFormData((prev) => ({ ...prev, author: parsedUser.username }));
    }
    const savedMemorials = localStorage.getItem("memorials");
    if (savedMemorials) {
      setMemorials(JSON.parse(savedMemorials));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMemorial: Memorial = {
      ...formData,
      id: Date.now(),
    };
    const updatedMemorials = [newMemorial, ...memorials];
    setMemorials(updatedMemorials);
    localStorage.setItem("memorials", JSON.stringify(updatedMemorials));
    setFormData({
      name: "",
      date: "",
      message: "",
      author: user?.username || "",
    });
    setShowForm(false);
  };

  return {
    user,
    memorials,
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
  };
};

