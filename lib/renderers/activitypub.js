const sanitizer = require('sanitizer')

module.exports = {
  name: 'ActivityPub',
  mime: 'application/activity+json',

  render (req, res) {
    const message = sanitizer.escape(req.message)
    const subtitle = sanitizer.escape(req.subtitle)
    const proto = req.get('x-forwarded-proto') || req.protocol
    const host = req.get('x-forwarded-host') || req.get('host')
    const base = `${proto}://${host}`
    res.set('Content-Type', 'application/activity+json')
    return res.json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Note',
      id: `${base}${req.path}`,
      mediaType: 'text/html',
      content: `<h1>${message}</h1><p><em>${subtitle}</em></p>`,
    })
  }
}