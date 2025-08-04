import { VideoData } from "../interfaces/youtube.interface";

export const downloadJson = (data: VideoData, filename = "data.json") => {
  const jsonString = JSON.stringify(data, null, 2); // pretty print
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
