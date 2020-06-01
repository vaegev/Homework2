import express from 'express';
import { getGroupById, getAllGroups, createGroup, updateGroup, removeGroup } from '../../services/user-groups.service';
import { addUsersToGroup } from '../../models/add-users-to-group';
import { createValidator } from 'express-joi-validation';
import groupSchema from '../../services/validate-group';

const validator = createValidator({});


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const group = await getGroupById(req.body, req.params.id);
        res.json(group);
    } catch (e) {
        next(e);
    }
});

router.post('/', validator.body(groupSchema), async (req, res, next) => {
    try {
        const newGroup = await createGroup(req.body);
        res.json(newGroup);
    } catch (e) {
        next(e);
    }
});

router.post('/:groupId', async (req, res, next) => {
    try {
        const newGroup = await addUsersToGroup(req.params.groupId, req.body.userIds);
        res.json(newGroup);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', validator.body(groupSchema), async (req, res, next) => {
    try {
        const updatedGroup = await updateGroup(req.params.id, req.body);
        res.json(updatedGroup);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const remove = await removeGroup(req.params.id);
        if (remove) {
            res.sendStatus(200);
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
