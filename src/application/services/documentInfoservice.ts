 import { IDocumentInfoService } from '../../domain/interfaces/services/iDocumentInfoService';

export class DocumentInfoService extends IDocumentInfoService {
  async getAll(): Promise<Array<string>> {
    return ['folder1', 'folder2', 'folder3'];
  }

  async existsFolder(folderName: string): Promise<boolean> {
    return true;
  }

  async save(folderName: string): Promise<boolean> {
    return true;
  }

  async delete(folderName: string): Promise<boolean> {
    return true;
  }

  async update(folderName: string): Promise<boolean> {
    return true;
  }
}
