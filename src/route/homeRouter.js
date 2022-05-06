var express = require('express')
const homeController = require('../controller/homeController')
const path = require('path');
const appRoot = require('app-root-path');
const multer = require('multer');
var router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, appRoot + '/src/public/img' )
    },
    filename: function (req, file, cb) {
      cb(null, 'upload_at_' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({storage: storage});

router.get('/', homeController.loadFirstPage)
router.get('/create/data', homeController.createPage)
router.post('/create/data/new', homeController.createNewData)
router.get('/details/edit/:videoID', homeController.editPage)
router.get('/details/:videoID', homeController.detailsPage)
router.put('/editing', homeController.editData)
router.delete('/delete/:id', homeController.deleteData)
router.get('/upload', homeController.uploadPage)
router.post('/upload/singleFile',upload.single('SingleFile'), homeController.uploadSingleFile)
router.post('/upload/multiFile', upload.array('MultiFile', 12), homeController.uploadMultiFile)
module.exports = router;