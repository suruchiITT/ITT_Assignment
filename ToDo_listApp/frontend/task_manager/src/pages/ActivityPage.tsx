import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchActivities } from "../features/activity/activitySlice";
import { useNavigate } from "react-router-dom";
import {
  ActivityContainer,
  ActivityHeader,
  ActivityTitle,
  BackButton,
  LogList,
  LogCard,
  LogMessage,
  LogTaskTitle,
  LogTime,
  LoadingText,
} from "../styles/ActivityStyles";

export default function ActivityPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logs, loading } = useAppSelector((state: any) => state.activity);

  useEffect(() => {
    dispatch(fetchActivities(1));
  }, [dispatch]);

  return (
    <ActivityContainer>
      <ActivityHeader>
        <ActivityTitle>Activity Logs</ActivityTitle>
        <BackButton onClick={() => navigate("/dashboard")}>Back to Board</BackButton>
      </ActivityHeader>

      {loading && <LoadingText>Loading activities...</LoadingText>}

      <LogList>
        {logs.map((log: any) => (
          <LogCard key={log._id}>
            <LogMessage>
              <LogTaskTitle>{log.task?.title || "Deleted Task"}</LogTaskTitle>: {log.message}
            </LogMessage>
            <LogTime>{new Date(log.createdAt).toLocaleString()}</LogTime>
          </LogCard>
        ))}
      </LogList>
    </ActivityContainer>
  );
}
