export default function handler(req, res) {
    const { pid } = req.query
    res.end(`You have requested: ${pid}`)
  }