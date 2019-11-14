function reactToClient(res, err, data) {
    if (!err) {//success
        res.status(200).send(data)
    } else {//error
        res.status(err.code).send(err)
    }
}
module.exports = {
    reactToClient
}