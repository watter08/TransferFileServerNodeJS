import { Router } from 'express';
import { DocumentController } from '../controllers/documentController';
import multer from 'multer';

const upload = multer();
const route = Router();

route.post('/upload', upload.single('file'), DocumentController.uploadDocument);
route.get('/documents/:clientId', DocumentController.listDocuments);
route.get('/download/:dropboxPath', DocumentController.downloadDocument);
route.delete('/delete/:dropboxPath', DocumentController.deleteDocument);
route.get('/clients-documents', DocumentController.listClientsWithDocuments);