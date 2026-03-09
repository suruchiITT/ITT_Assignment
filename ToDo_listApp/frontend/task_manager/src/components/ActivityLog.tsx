import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchActivities } from "../features/activity/activitySlice";
import Pagination from "./Pagination";
import {
  LogContainer,
  LogListArea,
  LogItem,
  LogTaskTitle,
  UserName,
  LogContent,
  DotSeparator,
  ColonSeparator,
  MessageText,
  Time,
  EmptyLog,
} from "../styles/ActivityLogStyles";

const LOGS_PER_PAGE = 8;

const ActivityLog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { logs, loading } = useAppSelector((state: any) => state.activity);
  const { user: authUser } = useAppSelector((state: any) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchActivities(1));
  }, [dispatch]);

  const totalPages = Math.ceil((logs || []).length / LOGS_PER_PAGE);
  const paginatedLogs = (logs || []).slice(
    (currentPage - 1) * LOGS_PER_PAGE,
    currentPage * LOGS_PER_PAGE,
  );

  if (loading && (logs || []).length === 0)
    return <LogContainer>Loading logs...</LogContainer>;

  return (
    <LogContainer>
      {(paginatedLogs || []).length === 0 ? (
        <EmptyLog>No activity yet.</EmptyLog>
      ) : (
        <>
          <LogListArea>
            {paginatedLogs.map((log: any) => {
              const name = log.user?.name || authUser?.name || "Someone";
              return (
                <LogItem key={log._id}>
                  <LogContent>
                    <UserName>{name}</UserName>
                    <DotSeparator>•</DotSeparator>
                    <LogTaskTitle>{log.task?.title || "Task"}</LogTaskTitle>
                    <ColonSeparator>:</ColonSeparator>
                    <MessageText>{log.message}</MessageText>
                  </LogContent>
                  <Time>{new Date(log.createdAt).toLocaleString()}</Time>
                </LogItem>
              );
            })}
          </LogListArea>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </LogContainer>
  );
};

export default ActivityLog;
