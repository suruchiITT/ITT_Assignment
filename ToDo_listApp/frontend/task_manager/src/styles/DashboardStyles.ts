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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  height: 44px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const Board = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  min-height: 0;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  align-items: center;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  padding: 4px 8px;
  color: white;
  gap: 6px;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const WhiteLabel = styled.label`
  color: white;
  font-weight: 600;
  white-space: nowrap;
  font-size: 12px;
`;

export const SmallInput = styled.input`
  padding: 2px 6px;
  font-size: 12px;
  background: white;
  border-radius: 2px;
  border: none;
  color: #172b4d;
  height: 24px;
  outline: none;
`;

export const SmallSelect = styled.select`
  padding: 0 4px;
  font-size: 12px;
  background: white;
  color: #172b4d;
  height: 24px;
  border-radius: 2px;
  border: none;
  outline: none;
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
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActivitySidebar = styled.div<{ show: boolean }>`
  width: ${(props) => (props.show ? "340px" : "0")};
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
  background: #fff;
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #172b4d;
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

export const CloseSidebarButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b778c;
`;
