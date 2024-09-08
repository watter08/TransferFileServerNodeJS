import { Dropbox, files } from 'dropbox';
import fetch from 'isomorphic-fetch'; 

export class DropboxClient {
  private dbx: Dropbox;

  constructor() {
    this.dbx = new Dropbox({
      accessToken: process.env.DROPBOX_ACCESS_TOKEN, 
      fetch: fetch
    });
  }

  async uploadFile(clientId: string, fileName: string, fileContent: Buffer): Promise<string> {
    const path = `/${clientId}/${fileName}`; 
    try {
      await this.dbx.filesUpload({
        path: path,
        contents: fileContent
      });
      return path;
    } catch (error) {
      console.error('Error uploading file to Dropbox:', error);
      throw new Error('Error uploading file to Dropbox');
    }
  }

  async downloadFile(dropboxPath: string): Promise<{ name: string; fileBinary: Buffer }> {
    try {
      const response = await this.dbx.filesDownload({ path: dropboxPath });

      if (response.result && 'fileBinary' in response.result) {
        const fileBinary = (response.result as files.FileMetadata & { fileBinary: Buffer }).fileBinary;
        const fileName = response.result.name;

        return { name: fileName, fileBinary };
      } else {
        throw new Error('Archivo no disponible en Dropbox.');
      }
    } catch (error) {
      console.error('Error descargando archivo desde Dropbox:', error);
      throw new Error('Error descargando archivo desde Dropbox');
    }
  }

  async deleteFile(dropboxPath: string): Promise<void> {
    try {
      await this.dbx.filesDeleteV2({ path: dropboxPath });
    } catch (error) {
      console.error('Error deleting file from Dropbox:', error);
      throw new Error('Error deleting file from Dropbox');
    }
  }
}