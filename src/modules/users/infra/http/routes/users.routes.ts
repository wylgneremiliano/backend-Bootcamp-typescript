import { Router } from "express";
import CreateUserService from "@modules/users/services/CreateUserService";
const usersRouter = Router();
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
const upload = multer(uploadConfig);
// SoC: Separation of Concerns (Separação de preocupações)
// DTO - Date Tranfer Object

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });
  delete user.password;
  return response.status(201).json({ user: user });
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  }
);
export default usersRouter;
