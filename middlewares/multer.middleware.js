const multer = require('multer');
const sharpMulter = require('sharp-multer');

const MIME_TYPE = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
}

// const newFilenameFunction = (og_filename, options) => {
// 	const newname =
// 	  og_filename.split(".").slice(0, -1).join(".") +
// 	  `${options.useTimestamp ? "-" + Date.now() : ""}` +
// 	  "." +
// 	  options.fileFormat;
// 	return newname;
// };

const newFilenameFunction = (og_filename, options) => {
	const filename = og_filename.split(' ').join('_')
	const filenameArray = filename.split('.')
	filenameArray.pop()
	const filenameWithoutExtention = filenameArray.join('.')

	const newName = filenameWithoutExtention + Date.now() + "." + options.fileFormat
	return newName
}

// const storage = multer.diskStorage({
// 	destination: function (req, file, callback) {
// 		callback(null, './public/books')
// 	},
// 	filename:  (req, file, callback) => {
// 		const filename = file.originalname.split(' ').join('_')
// 		const filenameArray = filename.split('.')
// 		filenameArray.pop()
// 		const filenameWithoutExtention = filenameArray.join('.')
// 			const extension = MIME_TYPE[file.mimetype]
// 		callback(null, filenameWithoutExtention + Date.now() + '.' + extension)
// 	}
// })

const storage = sharpMulter({
	destination: function (req, file, callback) {
		callback(null, './public/books')
	},
	imageOptions:{
		fileFormat: "webp",
		quality: 30,
		resize: {width: 500, height:650}
	},
	filename: newFilenameFunction
})


const upload = multer({
	storage,
})

module.exports = upload.single('image')