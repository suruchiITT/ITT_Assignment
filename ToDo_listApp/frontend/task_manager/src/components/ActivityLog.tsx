import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchActivities } from "../features/activity/activitySlice";
import styled from "styled-components";

const LogContainer = styled.div`
  background: #f4f5f7;
  padding: 16px;
  border-radius: 3px;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LogItem = styled.div`
  background: white;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  font-size: 14px;
`;

const TaskTitle = styled.span`
  font-weight: 600;
  color: #0079bf;
`;

const Time = styled.div`
  font-size: 12px;
  color: #5e6c84;
  margin-top: 4px;
`;

export default function ActivityLog() {
  const dispatch = useAppDispatch();
  const { logs, loading } = useAppSelector((state: any) => state.activity);

  useEffect(() => {
    dispatch(fetchActivities(1));
  }, [dispatch]);

  if (loading && logs.length === 0) return <div>Loading logs...</div>;

  return (
    <LogContainer>
      {logs.map((log: any) => (
        <LogItem key={log._id}>
          <div>
            <TaskTitle>{log.task?.title || "Task"}</TaskTitle>: {log.message}
          </div>
          <Time>{new Date(log.createdAt).toLocaleString()}</Time>
        </LogItem>
      ))}
    </LogContainer>
  );
}
