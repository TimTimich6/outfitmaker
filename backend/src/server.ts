import express from "express";
import fileupload from "express-fileupload";
import { removeBackgroundFromImageFile } from "remove.bg";
import fs from "fs";
const app = express();
app.use(express.json());
app.use(fileupload());
const port: number | string = process.env.port || 3080;

app.post("/api/upload", async (req: any, res) => {
  console.log("request rreceived");
  console.log(req.files);
  const outputDate = Date.now();
  const name = `${req.files.photo.name}${outputDate}.png`;
  fs.writeFileSync(`src/uploads/${name}`, req.files.photo.data);
  console.log("The file was saved!");
  try {
    const result = await removeBackgroundFromImageFile({
      path: `src/uploads/${name}`,
      apiKey: "cxU5uVJ4Cr2fxaJLfQuMLBLW",
      size: "preview",
      type: "product",
      crop: true,
      outputFile: `${__dirname}/uploads/${name}`,
    }).catch((err) => {
      console.log("error occured", err);
      res.status(500).send("failed to remove background");
      return;
    });
    console.log(result);

    if (result?.base64img) {
      res.send(result.base64img);
      fs.unlinkSync(`${__dirname}/uploads/${name}`);
      console.log("successfuly removed background");
    }
  } catch (error) {
    res.status(500).send("fail to remove background");
  }
});

app.listen(port, () => {
  console.log("listening on port", port);
});
