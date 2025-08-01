import { Request, Response } from "express";
import { NotFoundError } from "../core/error.response";
import YoutubeService from "../services/youtube.service";
import { OK } from "../core/success.response";


class YoutubeController {
    static async Analyze(req: Request, res: Response): Promise<void> {
        const {url} = req.body;
        if(!url) throw new NotFoundError("Url not found.");

        const response = await YoutubeService.Analyze(url);

        new OK({
            message: "Analyze success",
            data: response
        }).send(res);
    }
}

export default YoutubeController;