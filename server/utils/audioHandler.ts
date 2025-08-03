import youtubedl from 'youtube-dl-exec';
import path from 'path';
import fs from 'fs';
import { BadRequestError } from '../core/error.response';

export const downloadAudio = async (url: string, outputName: string): Promise<string> => {
  if (!url) throw new BadRequestError('URL is required');

  const outputDir = path.join(__dirname, '..', 'audios');
  const outputPath = path.join(outputDir, `${outputName}.wav`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await youtubedl(url, {
      extractAudio: true,
      audioFormat: 'wav',
      audioQuality: 0,
      output: outputPath,
      ffmpegLocation: require('@ffmpeg-installer/ffmpeg').path,
      preferFreeFormats: true,
      noCheckCertificates: true,
      noWarnings: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      ]
    });

    if (!fs.existsSync(outputPath)) {
      throw new Error('Audio file not created');
    }

    return outputPath;
  } catch (err) {
    console.error('Download failed:', err);
    throw new BadRequestError('Failed to download audio');
  }
};
