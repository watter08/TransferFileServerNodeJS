import { Request, Response } from 'express';


export class DocumentController {
  
  static async getFolderList(req: Request, res: Response): Promise<void> {
    const { clientId } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    res.status(200).send('File uploaded successfully.');
  }

}