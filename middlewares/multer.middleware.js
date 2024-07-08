const multer = require('multer');
const sharpMulter = require('sharp-multer');

const newFilenameFunction = (og_filename, options) => {
	const filename = og_filename.split(' ').join('_')
	const filenameArray = filename.split('.')
	filenameArray.pop()
	const filenameWithoutExtention = filenameArray.join('.')

	const newName = filenameWithoutExtention + Date.now() + "." + options.fileFormat
	return newName
}

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