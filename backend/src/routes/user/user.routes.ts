import { Router } from "express";
import { CreateUserController } from "../../controllers/user/CreateUserController";
import { DetailUserController } from "../../controllers/user/DetailUserController";

import { isAthenticated } from "../../middlewares/isAuthenticated";

const userRouter = Router();

userRouter.post("/users", new CreateUserController().handle);

userRouter.get("/me", isAthenticated, new DetailUserController().handle);

export { userRouter };
