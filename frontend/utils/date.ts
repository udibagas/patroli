export const formatDate = (value: string) => {
  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (value: string) => {
  return new Date(value).toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });
};

export const formatDateLong = (value: string) => {
  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
};
