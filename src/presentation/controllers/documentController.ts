import { Request, Response } from 'express';
import { DropboxService } from '../../application/services/dropboxService';

const dropboxService = new DropboxService();

export class DocumentController {
  static async uploadDocument(req: Request, res: Response): Promise<void> {
    const { clientId } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    await dropboxService.uploadDocument(clientId, file.originalname, file.buffer);
    res.status(200).send('File uploaded successfully.');
  }

  static async listDocuments(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;
    const documents = await dropboxService.listClientDocuments(clientId);
    res.json(documents);
  }

  static async downloadDocument(req: Request, res: Response): Promise<void> {
    const { dropboxPath } = req.params;
    const file = await dropboxService.downloadDocument(dropboxPath);
    res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
    res.send(file.fileBinary);
  }

  static async deleteDocument(req: Request, res: Response): Promise<void> {
    const { dropboxPath } = req.params;
    await dropboxService.deleteDocument(dropboxPath);
    res.status(200).send('File deleted successfully.');
  }

  static async listClientsWithDocuments(req: Request, res: Response): Promise<void> {
    const clients = await dropboxService.listClientsWithDocuments();
    res.json(clients);
  }
}