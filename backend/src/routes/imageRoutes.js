// routes/imageRoutes.js
import express from 'express';
import { 
  getAllImages,
  getListingImages,
  getPrimaryImage,
  setPrimaryImage
} from "../Controllers/imageController.js";

const router = express.Router();


// PUT set primary image
router.put('/:listingId/primary/:imageId', setPrimaryImage);



router.get('/', getAllImages);

// Get all images for a specific listing
router.get('/listings/:listingId', getListingImages);

// Get primary image for a specific listing
router.get('/listings/:listingId/primary', getPrimaryImage);

export default router;