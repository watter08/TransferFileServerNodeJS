import fs from 'fs';
import path from 'path';
import { StoredDocument } from '../../domain/interfaces/storedDocument';

export class LocalFileStore {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(__dirname, '../../../clients_documents.json');
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  // Obtener todos los documentos
  getDocuments(): StoredDocument[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Guardar un nuevo documento
  saveDocument(document: StoredDocument): void {
    const documents = this.getDocuments();
    documents.push(document);
    fs.writeFileSync(this.filePath, JSON.stringify(documents, null, 2));
  }

  // Eliminar un documento por ruta de Dropbox
  deleteDocument(dropboxPath: string): void {
    let documents = this.getDocuments();
    documents = documents.filter(doc => doc.dropboxPath !== dropboxPath);
    fs.writeFileSync(this.filePath, JSON.stringify(documents, null, 2));
  }

  // Obtener documentos por cliente
  getDocumentsByClient(clientId: string): StoredDocument[] {
    return this.getDocuments().filter(doc => doc.clientId === clientId);
  }

  // Listar clientes con documentos
  listClientsWithDocuments(): { clientId: string, documents: StoredDocument[] }[] {
    const documents = this.getDocuments();
    const clients = Array.from(new Set(documents.map(doc => doc.clientId)));

    return clients.map(clientId => ({
      clientId,
      documents: documents.filter(doc => doc.clientId === clientId)
    }));
  }
}
