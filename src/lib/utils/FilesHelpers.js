import fs from "fs";
import path from "path";
import ModelError from "./ModelError";
import { errorMessages } from "./errorMessages";

export default class FilesHelpers {
  static getAllDirectoryFiles(directory) {
    try {
      const _dir = path.join(process.cwd(), directory);
      const files = fs.readdirSync(_dir);
      return files;

    } catch(err){
      throw new ModelError(errorMessages.serverError,500) ;
    }
  }

  static deleteFilesInDirectory_IgnoreExtension(filename, directory) {
    const originalFileParts = filename.split(".");
    originalFileParts.pop(); // remove the extention from the list
    const _filename = originalFileParts.join(".");

    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const fileParts = file.split(".");
      fileParts.pop(); // remove the extention from the list
      const fileBaseName = fileParts.join(".");

      if (fileBaseName === _filename) {
        fs.unlinkSync(path.join(directory, file));
      }
    });
  }
}
