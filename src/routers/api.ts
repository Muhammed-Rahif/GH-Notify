import { Router, Request, Response } from "express";
import { checkIfStargazer, getStarGazers } from "../helpers";
const router: Router = Router();

router.get("/stars", (req: Request, res: Response) => {
    getStarGazers()
        .then((starGazers): void => {
            res.json(starGazers);
        })
        .catch(err => res.json(err));
});

export default router;
