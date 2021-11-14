import { Router, Request, Response } from "express";
import { register } from "../controllers";
import { getStarGazers } from "../helpers";
import { validationResults } from "../middlewares/validations";
import validateRegistrationForm from "../middlewares/validations/registration";
const router: Router = Router();

router.get("/stars", (req: Request, res: Response): void => {
    getStarGazers()
        .then((starGazers): void => {
            res.json({ success: true, starGazers });
        })
        .catch(err => res.json({ success: false, data: err }));
});

router.post("/register", validateRegistrationForm, validationResults, register);

router.get("/", (req: Request, res: Response) =>
    res.json({ success: true, message: "Everything works fine!" })
);

export default router;
