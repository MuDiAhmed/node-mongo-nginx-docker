const router = require("express").Router();
const commentsRepo = require("../../repositories/comment");

router.get("/", async (req, res) => {
  try {
    const comments = await commentsRepo.getAll();
    return res.json(comments);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = req.body;
    const createdComment = await commentsRepo.create(comment);
    return res.status(201).json(createdComment);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await commentsRepo.get(id);
    return res.json(comment);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const comment = req.body;
    const id = req.params.id;
    const updatedComment = await commentsRepo.update(id, comment);
    return res.json(updatedComment);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedComment = await commentsRepo.delete(id);
    return res.json(deletedComment);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

module.exports = router;
