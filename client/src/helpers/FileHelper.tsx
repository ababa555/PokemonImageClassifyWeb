export default class FileHelper {
  static createFileFromBase64(base64: string, name: string, type: string): File {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    return new File([buffer.buffer], name, {type: type});
  }
}