import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HealthLog } from "../types";

export const useHealthLog = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<HealthLog>({
    date: new Date().toISOString().split("T")[0],
    symptoms: "",
    severity: 5,
    notes: "",
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      const savedLogs = localStorage.getItem(
        `healthLogs_${parsedUser.id}`
      );
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: HealthLog = {
      ...formData,
      id: Date.now(),
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem(`healthLogs_${user.id}`, JSON.stringify(updatedLogs));
    setFormData({
      date: new Date().toISOString().split("T")[0],
      symptoms: "",
      severity: 5,
      notes: "",
    });
    setShowForm(false);
  };

  const deleteLog = (id: number) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    localStorage.setItem(`healthLogs_${user.id}`, JSON.stringify(updatedLogs));
  };

  return {
    user,
    logs,
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
    deleteLog,
  };
};

