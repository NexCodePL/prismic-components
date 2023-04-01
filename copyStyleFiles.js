import { getMatchingFiles, copyFile } from "@nexcodepl/fs";

const matchingFiles = await getMatchingFiles(`./src`, [".scss"]);

for (const file of matchingFiles) {
    await copyFile(file, file.replace("src/", "dist/"));
}
