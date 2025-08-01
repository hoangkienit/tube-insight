import { AnalyzeResult } from "../interfaces/youtube.interface";
import { analyzeYoutubeUrl } from "../utils/puppeteerHandler";



class YoutubeService {
    static async Analyze(url: string): Promise<AnalyzeResult> {
        const analyzeResult = await analyzeYoutubeUrl(url);
        return analyzeResult;
    }
}

export default YoutubeService;