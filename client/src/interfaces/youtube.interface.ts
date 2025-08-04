export interface Sentence {
    text: string;
    start: number;
    end: number;
    confidence: number;
    words: Word[];
}

export interface VideoData {
    thumbnailPath: string;
    title: string;
    channelName: string;
    duration: string;
    audioPath: string;
    sentences: {
        id: string;
        confidence: number;
        audio_duration: number;
        sentences: Sentence[];
    };
}

interface Word {
    text: string;
    start: number;
    end: number;
    confidence: number;
}