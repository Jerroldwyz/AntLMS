import { generatePresignedUrl } from "./helpers"

;(async () =>
  console.log(
    await generatePresignedUrl("prayer_pages/capital_sins.pdf", 3600)
  ))()
