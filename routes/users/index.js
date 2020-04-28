import express from 'express';
import { createValidator } from 'express-joi-validation';
import { userSchema } from '../../services/validate-user';
import { deleteUserById, findById, getAllUsers, save, update } from '../../services/users.service';

const router = express.Router();

const validator = createValidator({});

router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await findById(req.params.id);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.post('/', validator.body(userSchema), async (req, res, next) => {
    try {
        const newUser = await save(req.body);
        res.json(newUser);
    } catch (e) {
        return next(e);
    }
});

router.put('/:id', validator.body(userSchema), async (req, res, next) => {
    try {
        const newUser = await update(req.params.id, req.body);
        res.json(newUser[1][0]);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUserById(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
