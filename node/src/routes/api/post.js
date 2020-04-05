const router = require("express").Router();
const postRepo = require("../../repositories/post");

/**
 * @apiDefine PostModelResponse
 *
 * @apiSuccess {String} _id ID of the Post.
 * @apiSuccess {String} title Title of the Post.
 * @apiSuccess {String} body  Body of the Post.
 * @apiSuccess {Object} auther  Author of the Post.
 * @apiSuccess {String} auther.firstname  Author Firstname.
 * @apiSuccess {String} auther.lastname  Author Lastname.
 * @apiSuccess {Boolean} isPublished  Publish state of the Post.
 * @apiSuccess {String[]} tags  Tags of the Post.
 * @apiSuccess {Object} comments  Comments of the Post.
 * @apiSuccess {Object} meta  Meta of the Post.
 * @apiSuccess {Number} meta.votes  Total number of votes.
 * @apiSuccess {Number} meta.fans  Total number of fans.
 */

/**
 * @apiDefine PostModelParams
 *
 * @apiParam {String} _id ID of the Post.
 * @apiParam {String{10..60}} title Title of the Post.
 * @apiParam {String{10}} body  Body of the Post.
 * @apiParam {Object} auther  Author of the Post.
 * @apiParam {String} auther.firstname  Author Firstname.
 * @apiParam {String} auther.lastname  Author Lastname.
 * @apiParam {Boolean} isPublished  Publish state of the Post.
 * @apiParam {String[]} tags  Tags of the Post.
 * @apiParam {Object} comments  Comments of the Post.
 * @apiParam {Object} meta  Meta of the Post.
 * @apiParam {Number} meta.votes  Total number of votes.
 * @apiParam {Number} meta.fans  Total number of fans.
 */

/**
 * @api {get} /posts Request all posts
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName GetPosts
 * @apiGroup Posts
 * @apiUse PostModelResponse
 *
 * @apiExample {curl} Example usage:
 *     curl -i -X "GET" http://localhost:4300/api/posts
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "title": "Title",
 *       "body": "Body",
 *       "auther": {
 *          "firstname" : "John",
 *          "lastname" : "Doa"
 *        },
 *       "isPublished" : false,
 *       "tags": ["angular", "nodejs"],
 *       "meta": {
 *           "votes": 0,
 *           "favs": 0
 *        }
 *     }
 *    ]
 *
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 */
router.get("/", async (req, res) => {
  try {
    const posts = await postRepo.getAll();
    return res.json(posts);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

/**
 * @api {get} /posts/:id Request one post
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName GetPost
 * @apiGroup Posts
 * @apiParam {String} id Posts unique ID.
 * @apiUse PostModelResponse
 *
 * @apiExample {curl} Example usage:
 *     curl -i -X "GET" http://localhost:4300/api/posts/5e1734e8216a806f44e2623b
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "title": "Title",
 *       "body": "Body",
 *       "auther": {
 *          "firstname" : "John",
 *          "lastname" : "Doa"
 *        },
 *       "isPublished" : false,
 *       "tags": ["angular", "nodejs"],
 *       "meta": {
 *           "votes": 0,
 *           "favs": 0
 *        }
 *     }
 *
 * @apiError PostNotFound The id of the Post was not found.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "PostNotFound"
 *     }
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postRepo.get(id);
    return res.json(post);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

/**
 * @api {post} /posts Request one post
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName GetPost
 * @apiGroup Posts
 * @apiParam {String} id Posts unique ID.
 * @apiUse PostModelParams
 * @apiUse PostModelResponse
 *
 * @apiExample {curl} Example usage:
 *     curl http://localhost:4300/api/posts/ -iv -X "POST" -d '{"title":"referance auther post request post", "auther":"5e1742f746f52b7f9933baba", "body": "Test post body"}' -H "Content-type: application/json"
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "title": "Title",
 *       "body": "Body",
 *       "auther": {
 *          "firstname" : "John",
 *          "lastname" : "Doa"
 *        },
 *       "isPublished" : false,
 *       "tags": ["angular", "nodejs"],
 *       "meta": {
 *           "votes": 0,
 *           "favs": 0
 *        }
 *     }
 *
 * @apiError BadRequest wrong request body.
 * @apiError InvalidUserId wrong or notfound user id.
 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "BadRequest"
 *     }
 */
router.post("/", async (req, res) => {
  try {
    const createdPost = await postRepo.create(req.body);
    return res.status(201).json(createdPost);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = req.body;
    const id = req.params.id;
    const updatedPost = await postRepo.update(id, post);
    return res.json(updatedPost);
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
    const deletedPost = await postRepo.delete(id);
    return res.json(deletedPost);
  } catch (err) {
    if (err instanceof APIError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send(err.message);
  }
});

module.exports = router;
