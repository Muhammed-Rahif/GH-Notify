import { Router, Request, Response, NextFunction } from "express";
import { registerUser, updateUser } from "../controllers";
import { getStarGazers } from "../helpers";
import { validationResults } from "../middlewares/validations";
import validateRegistrationForm from "../middlewares/validations/registration";
import validateUserDataUpdation from "../middlewares/validations/userDataUpdation";
const router: Router = Router();

// Get stargazers array
router.get("/stars", (req: Request, res: Response): void => {
  getStarGazers()
    .then((starGazers): void => {
      res.json({ success: true, starGazers });
    })
    .catch(err => res.json({ success: false, data: err }));
});

// Register a new user
router.post(
  "/register-user",
  validateRegistrationForm,
  validationResults,
  registerUser
);

// Update user data
router.put(
  "/update-user",
  validateUserDataUpdation,
  validationResults,
  updateUser
);

router.get("/", (req: Request, res: Response) =>
  res.json({ success: true, message: "Everything works fine!" })
);

export default router;
