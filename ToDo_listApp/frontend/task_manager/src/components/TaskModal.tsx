import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  InputGroup,
  Label,
  Input,
  TextArea,
  Select,
  ButtonRow,
  PrimaryButton,
  DangerButton,
  GhostButton,
  CloseButton,
  ModalGrid,
  ErrorMessage,
} from "../styles/TaskModalStyles";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  onDelete?: () => void;
  title: string;
  initialData?: any;
  submitText: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  title,
  initialData,
  submitText,
}) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const [errors, setErrors] = React.useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });
    }
    setErrors({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
    });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const selectedDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newErrors = {
      title: !formData.title.trim() ? "Add title for title" : "",
      description: !formData.description.trim() ? "Add description for description" : "",
      priority: !formData.priority ? "Add priority for priority" : "",
      dueDate: !formData.dueDate 
        ? "Add due date for due date" 
        : (selectedDate < today ? "Due date cannot be in the past" : ""),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <InputGroup>
              <Label>Title</Label>
              <Input
                autoFocus
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter task title..."
              />
              {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
            </InputGroup>
            <InputGroup>
              <Label>Description</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add a more detailed description..."
              />
              {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
            </InputGroup>
            <ModalGrid>
              <InputGroup>
                <Label>Priority</Label>
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
                {errors.priority && <ErrorMessage>{errors.priority}</ErrorMessage>}
              </InputGroup>
              <InputGroup>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
                />
                {errors.dueDate && <ErrorMessage>{errors.dueDate}</ErrorMessage>}
              </InputGroup>
            </ModalGrid>
          </ModalBody>
          <ButtonRow>
            {onDelete && (
              <DangerButton type="button" onClick={onDelete}>Delete</DangerButton>
            )}
            <GhostButton type="button" onClick={onClose}>Cancel</GhostButton>
            <PrimaryButton type="submit">{submitText}</PrimaryButton>
          </ButtonRow>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TaskModal;
