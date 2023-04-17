import fs from "fs";
import path from "path";

export default class FilesHelpers {
  static getAllDirectoryFiles(directory) {
    const _dir = path.join(process.cwd(), directory);
    var files = [];

    try {
      files = fs.readdirSync(_dir);
    } catch (e) {
      console.log(e.message);
    }

    return files;
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
