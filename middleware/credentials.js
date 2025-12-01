export default function (req, res, next) {
    res.headers("Access-Control-Allow-Credentials", "true")
    res.headers("Access-Control-Allow-Origin", "http://localhost:5173")
    next()
}