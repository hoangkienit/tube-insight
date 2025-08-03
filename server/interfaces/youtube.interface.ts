

export interface AnalyzeResult {
    thumbnailPath: string;
    title: string;
    channelName: string;
    duration: string;
}

export interface AnalyzeResponse extends AnalyzeResult {
    audioPath: string;
}