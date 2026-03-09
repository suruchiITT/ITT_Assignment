import styled from "styled-components";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";

export const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export const DashboardContainer = styled.div`
  height: 100vh;
  background-color: #0079bf;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
`;

export const MainLayout = styled.div`
  display: flex;
  height: calc(100vh - 44px);
  overflow: hidden;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 12px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

export const ActivitySidebar = styled.div<{ show: boolean }>`
  width: ${(props) => (props.show ? "340px" : "0")};
  background: #f4f5f7;
  border-left: 1px solid #dfe1e6;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
`;

export const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dfe1e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #172b4d;
  font-weight: 600;
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  height: 44px;
  box-sizing: border-box;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  opacity: 0.9;
`;

export const LogoutButton = styled.button`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Board = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
  padding-bottom: 10px;
  flex: 1;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 4px;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 6px 10px;
  color: white;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #5e6c84;
`;

export const WhiteLabel = styled(Label)`
  color: white;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background: #fafbfc;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  transition: background 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none;
    background: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

export const SmallInput = styled(Input)`
  padding: 4px 8px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  width: auto;
  border: none;
  box-shadow: none;
  color: #172b4d;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background: #fafbfc;
  font-size: 14px;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

export const SmallSelect = styled(Select)`
  padding: 2px 8px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  width: auto;
  box-shadow: none;
  color: #172b4d;
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

export const CloseSidebarButton = styled(GhostButton)`
  padding: 4px 8px;
  font-size: 18px;
  color: #6b778c;
`;
