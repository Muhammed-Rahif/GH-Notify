import { Router, Request, Response } from "express";
import { getStarGazers } from "../helpers";
const router: Router = Router();

router.get("/stars", (req: Request, res: Response) => {
    getStarGazers().then((starGazers): void => {
        res.json(starGazers);
    });
});

export default router;
