import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  background: #f4f5f7;
  width: 100%;
  max-width: 600px;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
`;

export const ModalBody = styled.div`
  padding: 0 20px 20px 20px;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background: #fff;
  font-size: 14px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  transition: box-shadow 0.2s;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background: #fff;
  font-size: 14px;
  min-height: 100px;
  resize: none;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  transition: box-shadow 0.2s;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background: #fff;
  font-size: 14px;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px;
  background: #f4f5f7;
`;

export const PrimaryButton = styled.button`
  background: #5aac44;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #61bd4f;
  }
  &:active {
    background: #49852e;
  }
`;

export const DangerButton = styled.button`
  background: #eb5a46;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  margin-right: auto;
  transition: background 0.2s;
  &:hover {
    background: #cf513d;
  }
`;

export const GhostButton = styled.button`
  background: transparent;
  color: #172b4d;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: rgba(9, 30, 66, 0.08);
  }
`;

export const CloseButton = styled(GhostButton)`
  font-size: 20px;
  padding: 4px 8px;
`;

export const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const ErrorMessage = styled.span`
  color: #eb5a46;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;
