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
  ActivityUserName,
  ActivityMessage,
  ActivityTime,
  AvatarPlaceholder,
  EmptyActivity,
  ShowMoreButton,
  StatusValue,
  DueDateValue,
  ModalPaginationWrapper,
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
  const { user: authUser } = useAppSelector((state: any) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchActivities(1));
  }, [dispatch, task?._id]);

  const taskLogs = (logs || []).filter((log: any) => {
    const logId = log.task?._id || log.task;
    return logId?.toString() === task?._id?.toString();
  });

  const totalPages = Math.ceil(taskLogs.length / LOGS_PER_PAGE);
  const paginatedLogs = taskLogs.slice(
    (currentPage - 1) * LOGS_PER_PAGE,
    currentPage * LOGS_PER_PAGE
  );

  if (!task) return null;

  const description = task.description || "No description provided.";
  const isDescriptionLong = description.length > 200;
  const displayedDescription = isDescExpanded || !isDescriptionLong ? description : `${description.substring(0, 200)}...`;

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
              <StatusValue>{task.status}</StatusValue>
            </MetaItem>
            <MetaItem>
              <SectionLabel>Priority</SectionLabel>
              <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
            </MetaItem>
            <MetaItem>
              <SectionLabel>Due Date</SectionLabel>
              <DueDateValue>📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</DueDateValue>
            </MetaItem>
          </MetaInfoBar>
          <Section>
            <SectionLabel>📝 Description</SectionLabel>
            <DescriptionText maxHeight={isDescExpanded ? "300px" : "120px"}>
              {displayedDescription}
              {isDescriptionLong && (
                <div>
                  <ShowMoreButton onClick={() => setIsDescExpanded(!isDescExpanded)}>
                    {isDescExpanded ? "Show less" : "Show more..."}
                  </ShowMoreButton>
                </div>
              )}
            </DescriptionText>
          </Section>
          <ActivitySection>
            <SectionLabel>🕒 Recent Activity</SectionLabel>
            <ActivityList>
              {paginatedLogs.length === 0 ? (
                <EmptyActivity>No activity recorded for this task yet.</EmptyActivity>
              ) : (
                paginatedLogs.map((log: any) => {
                  const userName = log.user?.name || authUser?.name || "User";
                  return (
                    <ActivityItem key={log._id}>
                      <AvatarPlaceholder>{userName.charAt(0).toUpperCase()}</AvatarPlaceholder>
                      <ActivityContent>
                        <ActivityText>
                          <ActivityUserName>{userName}</ActivityUserName> <ActivityMessage>{log.message}</ActivityMessage>
                        </ActivityText>
                        <ActivityTime>{new Date(log.createdAt).toLocaleString()}</ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                  );
                })
              )}
            </ActivityList>
            {totalPages > 1 && (
              <ModalPaginationWrapper>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </ModalPaginationWrapper>
            )}
          </ActivitySection>
        </DetailsBody>
      </DetailsContent>
    </DetailsOverlay>
  );
};

export default TaskDetailsModal;
