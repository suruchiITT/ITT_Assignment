export const buildActivityMessage = (
  field: string,
  oldValue: any,
  newValue: any,
) => {
  switch (field) {
    case "title":
      return `Title changed to "${newValue}"`;

    case "description":
      return `Description updated`;

    case "status":
      return `Status changed from ${oldValue} to ${newValue}`;

    case "priority":
      return `Priority changed to ${newValue}`;

    default:
      return `Task updated`;
  }
};