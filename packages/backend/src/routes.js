const router = require('express').Router();
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const upload = multer(uploadConfig);

router.get('/posts', PostController.index);
router.post('/posts', upload.single('image'), PostController.store);

router.post('/posts/:id/like', LikeController.store);

module.exports = router;
