import express from "express";
import userService from "./users.service";
import { createValidator } from "express-joi-validation";
import querySchema from "./validate-user";

const router = express.Router();

const validator = createValidator({});

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.sendStatus(404);
  }
});

/* POST users listing. */
router.post("/", validator.body(querySchema), async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    res.json(newUser);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validator.body(querySchema), async (req, res, next) => {
  try {
    const newUser = await userService.update(req.body, req.params.id);
    res.json(newUser);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await userService.delete(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
});

module.exports = router;
