import {Router} from 'express';
import { addItem, deleteItem, getItemById, getItems, sendEnquireEmail } from '../controllers/items.controller.js';
import { uploadMedia } from '../middlewares/multer.middleware.js';



const router = Router();

router.route('/getItems').get(getItems);
router.route('/addItem').post(uploadMedia.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'additionalImages', maxCount: 5 }
    ]), addItem);

router.route('/deleteItem/:id').delete(deleteItem);
router.route('/getItem/:id').get(getItemById);
router.route('/sendmail').post(sendEnquireEmail);


export default router;