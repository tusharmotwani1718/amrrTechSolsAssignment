import {Router} from 'express';
import { addItem, deleteItem, getItems } from '../controllers/items.controller.js';
import { uploadMedia } from '../middlewares/multer.middleware.js';



const router = Router();

router.route('/getItems').get(getItems);
router.route('/addItem').post(uploadMedia.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'additionalImages', maxCount: 5 }
    ]), addItem);

router.route('/deleteItem/:id').delete(deleteItem);


export default router;