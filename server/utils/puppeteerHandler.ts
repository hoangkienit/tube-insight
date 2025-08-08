
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { BadRequestError } from '../core/error.response';
import { AnalyzeResult } from '../interfaces/youtube.interface';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

/**
 * Check if the YouTube URL is valid.
 */
export function isValidYouTubeUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return (
            parsed.hostname === 'www.youtube.com' ||
            parsed.hostname === 'youtube.com' ||
            parsed.hostname === 'youtu.be'
        );
    } catch (e) {
        return false;
    }
}

export async function analyzeYoutubeUrl(videoUrl: string): Promise<AnalyzeResult> {

    const browser = await puppeteer.launch({
        headless: 'shell',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote',
            // '--single-process',
        ],
        // executablePath: '/usr/bin/chromium'
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(10 * 60 * 1000);
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9'
    });
    await page.setViewport({ width: 1280, height: 720 });

    try {
        await page.goto(videoUrl, { waitUntil: 'networkidle2', timeout: 100000 });
        await page.waitForSelector('video', { timeout: 10000 });
        await page.waitForSelector('h1.title', { timeout: 10000 });
        await page.waitForSelector('ytd-channel-name', { timeout: 10000 });

        // Wait for the video element to load
        await page.waitForSelector('video', { timeout: 10000 });

        // Attempt to play the video
        await page.evaluate(() => {
            const video = document.querySelector('video') as HTMLVideoElement;
            if (video) video.play();
        });

        // Wait for playback to begin
        const isPlaying = await page.evaluate(async () => {
            const video = document.querySelector('video');
            if (!video) return false;

            return new Promise((resolve) => {
                const checkPlayback = () => {
                    if (video.currentTime > 0 && !video.paused) {
                        resolve(true);
                    } else {
                        setTimeout(checkPlayback, 500);
                    }
                };
                checkPlayback();
            });
        });

        if (!isPlaying) {
            throw new BadRequestError('Video did not start playing.');
        }

        // Take screenshot as thumbnail
        const filename = `${Date.now()}-thumbnail`;
        const screenshotDir = path.join(__dirname, '..', 'thumbnails');
        const screenshotPath = path.join(screenshotDir, filename);
        await page.screenshot({ path: `${screenshotPath}.png` });

        // Extract title, channel name, and duration
        const { title, channelName, duration } = await page.evaluate(() => {
            const titleEl = document.querySelector('h1.title yt-formatted-string');
            const channelEl = document.querySelector('ytd-channel-name yt-formatted-string');
            const videoEl = document.querySelector('video') as HTMLVideoElement;

            return {
                title: titleEl?.textContent?.trim() || '',
                channelName: channelEl?.textContent?.trim() || '',
                duration: videoEl ? new Date(videoEl.duration * 1000).toISOString().substr(11, 8) : ''
            };
        });

        await browser.close();

        return {
            thumbnailPath: screenshotPath,
            title,
            channelName,
            duration
        };
    } catch (err: any) {
        await browser.close();
        throw new BadRequestError(`Failed to process YouTube video: ${err.message}`);
    }
}