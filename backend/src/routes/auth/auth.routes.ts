import { Router } from "express";

import { AuthUserController } from "../../controllers/user/AuthUserController";

const authRouter = Router();

authRouter.post("/session", new AuthUserController().handle);

export { authRouter };
