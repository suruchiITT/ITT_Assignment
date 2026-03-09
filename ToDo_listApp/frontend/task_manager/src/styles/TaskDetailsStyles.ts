import styled from "styled-components";

export const DetailsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
`;

export const DetailsContent = styled.div`
  background: #f4f5f7;
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

export const DetailsHeader = styled.div`
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #dfe1e6;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const DetailsTitle = styled.h2`
  font-size: 20px;
  color: #172b4d;
  margin: 0;
  font-weight: 600;
  flex: 1;
  overflow-wrap: anywhere;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.3;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b778c;
  padding: 4px;
  border-radius: 4px;
  margin-left: 16px;
  &:hover {
    background: #ebecf0;
  }
`;

export const DetailsBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #5e6c84;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DescriptionText = styled.div<{ maxHeight?: string }>`
  font-size: 14px;
  color: #172b4d;
  line-height: 1.5;
  background: white;
  padding: 16px;
  border-radius: 3px;
  border: 1px solid #dfe1e6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-all;
  max-height: ${(props) => props.maxHeight || "200px"};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f4f5f7;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c7d0;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a5adba;
  }
`;

export const ShowMoreButton = styled.button`
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  color: #0052cc;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 0;
  margin-top: 4px;
  display: inline-block;
  &:hover {
    text-decoration: none;
    color: #0065ff;
  }
`;

export const MetaInfoBar = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActivitySection = styled.div`
  margin-top: 16px;
  border-top: 1px solid #dfe1e6;
  padding-top: 24px;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const AvatarPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  background: #dfe1e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #42526e;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityText = styled.div`
  font-size: 14px;
  color: #172b4d;
  overflow-wrap: anywhere;
  word-break: break-all;
`;

export const ActivityUserName = styled.strong`
  color: #0079bf;
  font-weight: 700;
`;

export const ActivityMessage = styled.span`
  color: #172b4d;
`;

export const ActivityTime = styled.div`
  font-size: 12px;
  color: #5e6c84;
  margin-top: 2px;
`;

export const EmptyActivity = styled.div`
  font-style: italic;
  color: #5e6c84;
  font-size: 14px;
  padding: 8px 0;
`;

export const StatusValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #42526e;
`;

export const DueDateValue = styled.div`
  font-size: 14px;
  color: #172b4d;
`;

export const ModalPaginationWrapper = styled.div`
  margin-top: 20px;
`;
