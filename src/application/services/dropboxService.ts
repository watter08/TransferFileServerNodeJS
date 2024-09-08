import { DropboxClient } from '../../infrastructure/dropbox/dropboxClient';
import { LocalFileStore } from '../../infrastructure/persistence/localFileStore';

export class DropboxService {
  private dropboxClient: DropboxClient;
  private fileStore: LocalFileStore;

  constructor() {
    this.dropboxClient = new DropboxClient();
    this.fileStore = new LocalFileStore();
  }

  async uploadDocument(clientId: string, fileName: string, fileContent: Buffer): Promise<void> {
    const dropboxPath = await this.dropboxClient.uploadFile(clientId, fileName, fileContent);
    
    this.fileStore.saveDocument({
      clientId,
      fileName,
      dropboxPath,
      uploadedAt: new Date()
    });
  }

  async listClientDocuments(clientId: string): Promise<any[]> {
    return this.fileStore.getDocumentsByClient(clientId);
  }

  async downloadDocument(dropboxPath: string): Promise<any> {
    return await this.dropboxClient.downloadFile(dropboxPath);
  }

  async deleteDocument(dropboxPath: string): Promise<void> {
    await this.dropboxClient.deleteFile(dropboxPath);
    this.fileStore.deleteDocument(dropboxPath);
  }

  async listClientsWithDocuments(): Promise<any[]> {
    return this.fileStore.listClientsWithDocuments();
  }
}