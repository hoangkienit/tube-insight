import React, { useState } from 'react';
import './VideoAnalyzer.css';
import { AnalyzeVideo } from '../api/youtube.api';

interface VideoData {
    thumbnailPath: string;
    title: string;
    channelName: string;
    duration: string;
}

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
                setVideo(res.data);
            }
        } catch (error) {
            alert('Failed to analyze video');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyzer-container">
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
        </div>
    );
};

export default VideoAnalyzer;
