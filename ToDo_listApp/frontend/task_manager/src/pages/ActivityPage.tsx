import { useNavigate } from "react-router-dom";
import ActivityLog from "../components/ActivityLog";
import {
  ActivityContainer,
  ActivityHeader,
  ActivityTitle,
  BackButton,
  ActivityLogWrapper,
} from "../styles/ActivityStyles";

export default function ActivityPage() {
  const navigate = useNavigate();

  return (
    <ActivityContainer>
      <ActivityHeader>
        <ActivityTitle>Activity Logs</ActivityTitle>
        <BackButton onClick={() => navigate("/dashboard")}>Back to Board</BackButton>
      </ActivityHeader>

      <ActivityLogWrapper>
        <ActivityLog />
      </ActivityLogWrapper>
    </ActivityContainer>
  );
}
