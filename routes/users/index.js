import express from 'express';
import { createValidator } from 'express-joi-validation';
import querySchema from '../../services/validate-user';
import deleteUser from './delete-users';
import getUsers from './get-users';
import getUsersById from './get-users-by-id';
import postUser from './post-users';
import putUsers from './put-users';

const router = express.Router();

const validator = createValidator({});

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', validator.body(querySchema), postUser);

router.put('/:id', validator.body(querySchema), putUsers);

router.delete('/:id', deleteUser);

module.exports = router;
