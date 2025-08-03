import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../core/error.response";
import YoutubeService from "../services/youtube.service";
import { OK } from "../core/success.response";
import { isValidYouTubeUrl } from "../utils/puppeteerHandler";


class YoutubeController {
    static async Analyze(req: Request, res: Response): Promise<void> {
        const { url } = req.body;
        if (!url) throw new NotFoundError("Url not found.");

        if (!isValidYouTubeUrl(url)) {
            throw new BadRequestError('Invalid YouTube URL');
        }

        const response = await YoutubeService.Analyze(url);

        new OK({
            message: "Analyze success",
            data: response
        }).send(res);
    }
}

export default YoutubeController;