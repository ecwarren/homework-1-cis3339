module.exports = function handleError(res, err) {
  if (err.code === 11000) return res.status(409).json({ error: 'That record already exists.' });
  if (err.name === 'ValidationError')
    return res.status(400).json({ error: Object.values(err.errors).map(e => e.message).join(' ') });
  if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid id.' });
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
};