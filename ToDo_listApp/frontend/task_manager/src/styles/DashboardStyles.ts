import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  padding: 30px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const LogoutButton = styled.button`
  padding: 8px 14px;
  background: #ef4444;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

export const Board = styled.div`
  display: flex;
  gap: 20px;
`;

export const Column = styled.div`
  background: #f1f5f9;
  width: 320px;
  min-height: 500px;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export const ColumnTitle = styled.h3`
  margin-bottom: 15px;
`;

export const TaskCard = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const PriorityTag = styled.span<{ priority: string }>`
  display: inline-block;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  color: white;
  margin-top: 6px;
  background: ${(props) =>
    props.priority === "High"
      ? "#ef4444"
      : props.priority === "Medium"
      ? "#f59e0b"
      : "#22c55e"};
`;

export const StatusSelect = styled.select`
  margin-top: 8px;
  padding: 6px;
  border-radius: 6px;
`;

export const AddTaskButton = styled.button`
  padding: 8px 12px;
  background: #22c55e;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background: #16a34a;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
`;

export const ModalButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  background: #1e293b;
  padding: 15px;
  border-radius: 10px;
`;

export const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 6px;
`;

export const FilterInput = styled.input`
  padding: 8px;
  border-radius: 6px;
`;