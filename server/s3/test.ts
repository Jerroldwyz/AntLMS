import { generatePresignedUrl } from "./helpers"

;(async () => {
  console.log(
    await generatePresignedUrl("antlms", "prayer_pages/capital_sins.pdf", 3600)
  )
})()
