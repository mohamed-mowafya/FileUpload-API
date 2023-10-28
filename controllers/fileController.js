const handleUpload = (req, res) => {
    return res.status(200).json({ status: 'File upload successful' });
}

module.exports = { handleUpload };