import { useMemorial } from "./hooks/useMemorial";
import MemorialHeader from "./components/MemorialHeader";
import MemorialForm from "./components/MemorialForm";
import MemorialList from "./components/MemorialList";

const MemorialPage = () => {
  const {
    user,
    memorials,
    showForm,
    setShowForm,
    formData,
    setFormData,
    handleSubmit,
  } = useMemorial();

  return (
    <div className="min-vh-100 bg-gradient-purple py-5 position-relative">
      <div className="bg-pattern" style={{ opacity: 0.3 }} />

      <div className="container position-relative" style={{ maxWidth: "1000px", zIndex: 1 }}>
        <MemorialHeader
          user={user}
          showForm={showForm}
          onToggleForm={() => setShowForm(!showForm)}
        />

        {showForm && user && (
          <div className="animate-fade-in-down">
            <MemorialForm
              formData={formData}
              onFormDataChange={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <MemorialList memorials={memorials} user={user} />
      </div>
    </div>
  );
};

export default MemorialPage;

