const {
  findAll,
  findById,
  findTracksByAlbumId,
  create,
  updateOne,
  deleteOne,
} = require('./albumsModel');

const getAll = (req, res) => {
  findAll()
    .then(([albums]) => res.status(200).json(albums))
    .catch((err) => {
      console.error(err);
      res.status(500).json('error server');
    });
};

const getOne = (req, res) => {
  findById(req.params.id)
    .then(([albums]) => {
      if (!albums) return res.sendStatus(404); //undifined ou vide
      res.status(200).json(albums);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json('error server');
    });
};

const getTracksByAlbumId = (req, res) => {
  findTracksByAlbumId(req.params.id)
    .then((tracks) => res.status(200).json(tracks))
    .catch((err) => {
      console.error(err);
      res.status(500).json('error server');
    });
};

const postAlbums = (req, res) => {
  create(req.body)
    .then((result) =>
      res.status[201].json({ id: result.insertId, ...req.body })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json('error server');
    });
};

const updateAlbums = (req, res) => {
  updateOne(req.params.id, req.body).then(() => res.sendStatus(204));
};

const deleteAlbums = (req, res) => {
  findById(req.params.id).then(([albums]) => {
    if (!albums) return res.sendStatus(404);
    deleteOne(req.params.id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500).json('error server');
      });
  });
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
