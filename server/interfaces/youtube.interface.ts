

export interface AnalyzeResult {
    thumbnailPath: string;
    title: string;
    channelName: string;
    duration: string;
}

export interface AnalyzeResponse extends AnalyzeResult {
    audioPath: string;
    sentences: {
        id: string;
        confidence: number;
        audio_duration: number;
        sentences: Sentence[];
    };
}

interface Sentence {
    text: string;
    start: number;
    end: number;
    confidence: number;
    words: Word[];
}

interface Word {
    text: string;
    start: number;
    end: number;
    confidence: number;
}
