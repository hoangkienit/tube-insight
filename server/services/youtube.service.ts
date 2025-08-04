import { AnalyzeResponse } from "../interfaces/youtube.interface";
import { downloadAudio } from "../utils/audioHandler";
import { analyzeYoutubeUrl } from "../utils/puppeteerHandler";
import { handleProcessTranscribeAudio } from "../utils/transcribeHandler";



class YoutubeService {
    static async Analyze(url: string): Promise<AnalyzeResponse> {
        const [analyzeResult, audioPath] = await Promise.all([
            analyzeYoutubeUrl(url),
            downloadAudio(url, `${Date.now()}-audio`)
        ]);

        const sentences = await handleProcessTranscribeAudio(audioPath);
        
        return {
            ...analyzeResult,
            audioPath,
            sentences
        };
    }
}

export default YoutubeService;