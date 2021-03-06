const express = require('express');
const router = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/avatarUsers')
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    cb(null, file.fieldname + '-' + date + file.originalname)
  }
});

const upload = multer({storage: storage});

const controllers = require('../controllers/user.controllers');

router.get('/', controllers.index);

//router.get('/delete/:userId', controllers.delete);
router.get('/search', controllers.search);

router.get('/create', controllers.getCreate);

router.post('/create', upload.single('avatarUrl'), controllers.postCreate);

router.get('/edit/:id', controllers.getEdit);

router.post('/edit/:id', upload.single('avatarUrl'), controllers.postEdit);


router.get('/:id', controllers.view);

//router.delete('/:userId', controllers.delete);





module.exports = router;