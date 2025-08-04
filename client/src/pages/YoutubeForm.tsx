import React, { useState } from 'react';
import './VideoAnalyzer.css';
import { AnalyzeVideo } from '../api/youtube.api';
import ToastNotification, { showTopToast } from '../components/toasts/toast';
import { VideoData } from '../interfaces/youtube.interface';

export const VideoAnalyzer: React.FC = () => {
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!url) return;
        setLoading(true);
        try {
            const res = await AnalyzeVideo(url);

            if (res.success) {
                console.log(res.data);
                setVideo(res.data);
            }
        } catch (error: any) {
            showTopToast(error.message, "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyzer-container">
            <ToastNotification />
            <h1 className="analyzer-title">YouTube Video Analyzer</h1>
            <div className="analyzer-input-group">
                <input
                    type="text"
                    className="analyzer-input"
                    placeholder="Paste YouTube URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button className="analyzer-button" onClick={handleAnalyze} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>

            {video && (
                <div className="analyzer-card">
                    <img src={`http://localhost:5000/thumbnails/${video.thumbnailPath.split('/').pop()}.png`} alt="Thumbnail" className="analyzer-thumbnail" />
                    <div className="analyzer-details">
                        <h2 className="analyzer-video-title">{video.title}</h2>
                        <p className="analyzer-channel">Channel: {video.channelName}</p>
                        <p className="analyzer-duration">Duration: {video.duration}</p>
                    </div>
                </div>
            )}

            <h2 className="transcript-title">Transcript</h2>
            {video?.sentences.sentences.map((sentence, index) => (
                <div key={index} className="transcript-sentence">
                    <div className="transcript-sentence-header">
                        <span className="transcript-sentence-label">Sentence {index + 1}:</span>
                        <span className="transcript-confidence">Confidence: {sentence.confidence.toFixed(2)}</span>
                    </div>
                    <p className="transcript-text">{sentence.text}</p>
                    <ul className="transcript-word-list">
                        {sentence.words.map((word, i) => (
                            <li
                                key={i}
                                className={`transcript-word ${word.confidence < 0.6 ? "transcript-word-low" : ""
                                    }`}
                            >
                                "{word.text}" — confidence: {word.confidence.toFixed(2)}, start: {word.start}, end: {word.end}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default VideoAnalyzer;
