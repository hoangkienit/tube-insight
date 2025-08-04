import { AnalyzeResponse, Sentence } from "../interfaces/youtube.interface";
import { downloadAudio } from "../utils/audioHandler";
import { detectAIText } from "../utils/detector";
import { analyzeYoutubeUrl } from "../utils/puppeteerHandler";
import { handleProcessTranscribeAudio } from "../utils/transcribeHandler";



class YoutubeService {
    static async Analyze(url: string): Promise<AnalyzeResponse> {
        const [analyzeResult, audioPath] = await Promise.all([
            analyzeYoutubeUrl(url),
            downloadAudio(url, `${Date.now()}-audio`)
        ]);

        const sentences = await handleProcessTranscribeAudio(audioPath);

        const sentenceData = sentences.sentences;

        // Process each sentence in parallel
        const enrichedSentences: Sentence[] = await Promise.all(
            sentenceData.map(async (sentence: Sentence) => {
                const aiProb = await detectAIText(sentence.text);
                return { ...sentence, ai_probability: aiProb };
            })
        );

        // Replace the original sentences with enriched ones
        const analyzedSentences: AnalyzeResponse['sentences'] = {
            ...sentences,
            sentences: enrichedSentences,
        };

        return {
            ...analyzeResult,
            audioPath,
            sentences: analyzedSentences
        };
    }
}

export default YoutubeService;