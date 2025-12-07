import { useHealthLog } from "./hooks/useHealthLog";
import HealthLogHeader from "./components/HealthLogHeader";
import LogForm from "./components/LogForm";
import LogList from "./components/LogList";

const HealthLogPage = () => {
  const {
    user,
    logs,
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
    deleteLog,
  } = useHealthLog();

  if (!user) return null;

  return (
    <div className="min-vh-100 bg-gradient-secondary py-5">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <HealthLogHeader
          showForm={showForm}
          onToggleForm={() => setShowForm(!showForm)}
        />

        {showForm && (
          <div className="animate-fade-in-down">
            <LogForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <LogList logs={logs} onDelete={deleteLog} />
      </div>
    </div>
  );
};

export default HealthLogPage;

