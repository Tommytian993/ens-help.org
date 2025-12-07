import { getStatusStyle, getStatusMessage } from "../utils";

interface StatusCardProps {
  verificationStatus: string;
}

const StatusCard = ({ verificationStatus }: StatusCardProps) => {
  const statusStyle = getStatusStyle(verificationStatus);
  const statusClass = 
    verificationStatus === "verified" ? "status-verified" :
    verificationStatus === "pending" ? "status-pending" :
    "status-unverified";

  return (
    <div className="card border-0 shadow-sm rounded-xl p-4 mb-4">
      <div className={`p-4 rounded-3 border ${statusClass}`}>
        <div className="fw-medium">
          {getStatusMessage(verificationStatus)}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;

