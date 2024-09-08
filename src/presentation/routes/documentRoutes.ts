import { Router } from 'express';
import { DocumentController } from '../controllers/documentController';
import multer from 'multer';

const upload = multer();
const route = Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a document
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
route.post('/upload', upload.single('file'), DocumentController.uploadDocument);

/**
 * @swagger
 * /documents/{clientId}:
 *   get:
 *     summary: Get a list of documents for a specific client
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The client's ID
 *     responses:
 *       200:
 *         description: A list of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   path:
 *                     type: string
 */
route.get('/documents/:clientId', DocumentController.listDocuments);

/**
 * @swagger
 * /download/{dropboxPath}:
 *   get:
 *     summary: Download a document from Dropbox
 *     parameters:
 *       - in: path
 *         name: dropboxPath
 *         required: true
 *         schema:
 *           type: string
 *         description: The path of the document in Dropbox
 *     responses:
 *       200:
 *         description: The document was downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 */
route.get('/download/:dropboxPath', DocumentController.downloadDocument);

/**
 * @swagger
 * /delete/{dropboxPath}:
 *   delete:
 *     summary: Delete a document from Dropbox
 *     parameters:
 *       - in: path
 *         name: dropboxPath
 *         required: true
 *         schema:
 *           type: string
 *         description: The path of the document in Dropbox
 *     responses:
 *       200:
 *         description: Document deleted successfully
 */
route.delete('/delete/:dropboxPath', DocumentController.deleteDocument);

/**
 * @swagger
 * /clients-documents:
 *   get:
 *     summary: Get a list of clients with their respective documents
 *     responses:
 *       200:
 *         description: A list of clients with documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   clientId:
 *                     type: string
 *                   documents:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         path:
 *                           type: string
 */
route.get('/clients-documents', DocumentController.listClientsWithDocuments);

export default route;