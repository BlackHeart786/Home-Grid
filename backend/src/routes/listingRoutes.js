import express from 'express';
import { 
  getAllListings,
  getListingById,
  getListingImages, // Add this import
  createListing,
  updateListing,
  deleteListing 
} from '../Controllers/listingController.js';

const router = express.Router();

// GET all listings
router.get('/', getAllListings);

// GET a single listing by ID
router.get('/:id', getListingById);

// GET all images for a listing
router.get('/:id/images', getListingImages); 

// POST create a new listing
router.post('/', createListing);

// PUT update a listing
router.put('/:id', updateListing);

// DELETE a listing
router.delete('/:id', deleteListing);

export default router;