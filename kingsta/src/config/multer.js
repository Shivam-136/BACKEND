import multer from "multer"

let storage = multer.memoryStorage()

export const uplode = multer({storage})