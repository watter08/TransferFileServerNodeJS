export abstract class IDocumentInfoService {
    abstract getAll(): Promise<Array<string>>;
    abstract existsFolder(folderName: string): Promise<boolean>;
    abstract save(folderName: string): Promise<boolean>;
    abstract delete(folderName: string): Promise<boolean>;
    abstract update(folderName: string): Promise<boolean>;
  }