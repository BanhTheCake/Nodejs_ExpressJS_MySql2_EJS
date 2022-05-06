const pool = require('../config/database/database')

class homeController {
    async loadFirstPage(req, res, next) {
        let [data] = await pool.query('SELECT * FROM `music`');
        return res.render('home', {data});
    }
    createPage(req, res, next) {
        return res.render('create');
    }
    async createNewData(req, res, next) {
        let {name, Desc, videoID} = req.body;
        if(!name || !Desc || !videoID) {
            return res.send("Không có dữ Liệu");
        }
        let checkData = await pool.execute('select * from `music` where `videoID` = ?',[videoID]);
        checkData = checkData[0];
        if (checkData.length != 0) {
            return res.send("da bi trung du lieu!");
        }
        let Img = `https://i.ytimg.com/vi/${videoID}/maxresdefault.jpg`;
        await pool.execute('insert into `music`(`Img`, `videoID`, `name`, `Desc`) values (?, ?, ?, ?)', [Img, videoID, name, Desc])
        return res.redirect('back')
    }   
    async detailsPage(req, res, next) {
        const {videoID} = req.params;
        let [data] = await pool.execute('SELECT * FROM `music` WHERE `videoID` = ?', [videoID]);
        return res.render('details', {data: data[0]})
    }
    async editPage(req, res, next) {
        const {videoID} = req.params;
        let [data] = await pool.execute('SELECT * FROM `music` WHERE `videoID` = ?', [videoID])
        return res.render('edit', {data: data[0]});
    }
    async editData(req, res, next) {
        let {name, Desc, videoID, ID} = req.body;
        if(!name || !Desc || !videoID) {
            return res.send("Không có dữ Liệu");
        }
        let Img = `https://i.ytimg.com/vi/${videoID}/maxresdefault.jpg`
        await pool.execute('update `music` set `name`= ?, `Desc`= ?, `videoID`= ?, `Img` = ? where `ID`= ?', [name, Desc, videoID, Img, ID]);
        return res.redirect('/')
    }
    async deleteData(req, res, next) {
        const {id} = req.params
        await pool.execute('DELETE FROM `music` WHERE `ID` = ?', [id]);
        return res.redirect('/')
    }
    uploadPage(req, res, next) {
        return res.render('upload')
    }
    uploadSingleFile(req, res, next) {
        const data = req.file;
        return res.render('uploadSource', {data: data.filename, dataMulti: []})
    }
    uploadMultiFile(req, res, next) {
        const data = req.files;
        const newData = data.reduce((newArr, item) => {
            newArr.push(item.filename);
            return newArr
        }, [])
        return res.render('uploadSource', {dataMulti: newData, data: []})
    }
}

module.exports = new homeController;