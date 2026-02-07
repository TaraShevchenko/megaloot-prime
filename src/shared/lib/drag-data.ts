const DRAG_DATA_MIME = "application/x-megaloot";

export const setDragData = (dataTransfer: DataTransfer, data: unknown) => {
  dataTransfer.setData(DRAG_DATA_MIME, JSON.stringify(data));
  dataTransfer.effectAllowed = "move";
};

export const getDragData = <T = unknown>(
  dataTransfer: DataTransfer,
): T | null => {
  const raw = dataTransfer.getData(DRAG_DATA_MIME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};
