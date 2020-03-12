const router = require("express").Router();
module.exports = router;

router.use("/users", require("./Users"));
router.use("/transaction", require("./Transaction"));
