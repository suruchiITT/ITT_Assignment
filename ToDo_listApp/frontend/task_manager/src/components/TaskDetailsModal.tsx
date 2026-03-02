import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { fetchActivities } from "../features/activity/activitySlice";
import {
  DetailsOverlay,
  DetailsContent,
  DetailsHeader,
  DetailsTitle,
  CloseButton,
  DetailsBody,
  Section,
  SectionLabel,
  DescriptionText,
  MetaInfoBar,
  MetaItem,
  ActivitySection,
  ActivityList,
  ActivityItem,
  ActivityContent,
  ActivityText,
  ActivityTime,
  AvatarPlaceholder,
  EmptyActivity,
} from "../styles/TaskDetailsStyles";
import { PriorityTag } from "../styles/TaskCardStyles";
import Pagination from "./Pagination";

interface TaskDetailsModalProps {
  task: any;
  onClose: () => void;
}

const LOGS_PER_PAGE = 5;

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose }) => {
  const dispatch = useAppDispatch();
  const { logs } = useAppSelector((state: any) => state.activity);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch logs when modal opens to ensure we have the latest
    dispatch(fetchActivities(1));
  }, [dispatch, task._id]);

  // Filter logs for this specific task
  // The backend usually stores taskId as an ID or an object. 
  // We'll check both for robustness.
  const taskLogs = logs.filter((log: any) => 
    (log.task?._id === task._id) || (log.task === task._id)
  );

  const totalPages = Math.ceil(taskLogs.length / LOGS_PER_PAGE);
  const paginatedLogs = taskLogs.slice(
    (currentPage - 1) * LOGS_PER_PAGE,
    currentPage * LOGS_PER_PAGE
  );

  if (!task) return null;

  return (
    <DetailsOverlay onClick={onClose}>
      <DetailsContent onClick={(e) => e.stopPropagation()}>
        <DetailsHeader>
          <DetailsTitle>{task.title}</DetailsTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </DetailsHeader>

        <DetailsBody>
          <MetaInfoBar>
            <MetaItem>
              <SectionLabel>Status</SectionLabel>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#42526e" }}>
                {task.status}
              </div>
            </MetaItem>
            <MetaItem>
              <SectionLabel>Priority</SectionLabel>
              <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
            </MetaItem>
            <MetaItem>
              <SectionLabel>Due Date</SectionLabel>
              <div style={{ fontSize: "14px", color: "#172b4d" }}>
                📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
              </div>
            </MetaItem>
          </MetaInfoBar>

          <Section>
            <SectionLabel>📝 Description</SectionLabel>
            <DescriptionText>
              {task.description || "No description provided."}
            </DescriptionText>
          </Section>

          <ActivitySection>
            <SectionLabel>🕒 Recent Activity</SectionLabel>
            <ActivityList>
              {paginatedLogs.length === 0 ? (
                <EmptyActivity>No activity recorded for this task yet.</EmptyActivity>
              ) : (
                paginatedLogs.map((log: any) => (
                  <ActivityItem key={log._id}>
                    <AvatarPlaceholder>
                      {log.user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarPlaceholder>
                    <ActivityContent>
                      <ActivityText>
                        <strong>{log.user?.name || "Someone"}</strong> {log.message}
                      </ActivityText>
                      <ActivityTime>
                        {new Date(log.createdAt).toLocaleString()}
                      </ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))
              )}
            </ActivityList>
            
            {totalPages > 1 && (
              <div style={{ marginTop: "20px" }}>
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </ActivitySection>
        </DetailsBody>
      </DetailsContent>
    </DetailsOverlay>
  );
};

export default TaskDetailsModal;
