import { AnalyzeResponse } from "../interfaces/youtube.interface";
import { downloadAudio } from "../utils/audioHandler";
import { analyzeYoutubeUrl } from "../utils/puppeteerHandler";



class YoutubeService {
    static async Analyze(url: string): Promise<AnalyzeResponse> {
        const [analyzeResult, audioPath] = await Promise.all([
            analyzeYoutubeUrl(url),
            downloadAudio(url, `${Date.now()}-audio`)
        ]);
        
        return {
            ...analyzeResult,
            audioPath
        };
    }
}

export default YoutubeService;