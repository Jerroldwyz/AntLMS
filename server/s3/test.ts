const { generatePresignedUrl } = require("./helpers")

console.log(
  generatePresignedUrl("antlms", "prayer_pages/capital_sins.pdf", 3600)
)
