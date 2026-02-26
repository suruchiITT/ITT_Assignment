import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #0079bf;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

export const MainLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

export const ActivitySidebar = styled.div<{ show: boolean }>`
  width: ${(props) => (props.show ? "300px" : "0")};
  background: #f4f5f7;
  border-left: 1px solid #dfe1e6;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dfe1e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #172b4d;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.15);
  color: white;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

export const LogoutButton = styled.button`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Board = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-bottom: 10px;
`;

export const Column = styled.div`
  background: #ebecf0;
  width: 272px;
  max-height: calc(100vh - 160px);
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const ColumnHeader = styled.div`
  padding: 4px 8px 12px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ColumnTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
`;

export const TaskCard = styled.div`
  background: white;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  &:hover {
    background: #f4f5f7;
  }
`;

export const TaskTitle = styled.div`
  font-size: 14px;
  color: #172b4d;
  margin-bottom: 8px;
  word-wrap: break-word;
`;

export const PriorityTag = styled.span<{ priority: string }>`
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 2px;
  color: white;
  background: ${(props) =>
    props.priority === "High"
      ? "#eb5a46"
      : props.priority === "Medium"
      ? "#f2d600"
      : "#61bd4f"};
`;

export const AddTaskButton = styled.button`
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  border-radius: 3px;
  color: #5e6c84;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #f4f5f7;
  padding: 24px;
  border-radius: 3px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  color: #172b4d;
  margin: 0;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #5e6c84;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  background: #fafbfc;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #0079bf;
  }
`;

export const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  background: #fafbfc;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #0079bf;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  background: #fafbfc;
  font-size: 14px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const PrimaryButton = styled.button`
  padding: 8px 16px;
  background: #0079bf;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: #026aa7;
  }
`;

export const DangerButton = styled.button`
  padding: 8px 16px;
  background: #eb5a46;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: #cf513d;
  }
`;

export const GhostButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #172b4d;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: rgba(9, 30, 66, 0.08);
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 4px 8px;
  color: white;
  gap: 8px;
`;

export const StatusSelect = styled.select`
  margin-top: 8px;
  padding: 4px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #dfe1e6;
  background: #ebecf0;
  width: fit-content;
`;
