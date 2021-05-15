const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// finds all tags
// includes its associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// finds a single tag by its `id`
// includes its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPK(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "Sorry No tag found with this id" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const tagLocationData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagLocationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateTag) => {
      res.json(updateTag);
    })
    .catch((err) => res.json(err));
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteTag) => {
      res.json(deleteTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
