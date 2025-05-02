import Listing from '../Models/listing.js';
import { execute } from "../config/db.js";


export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ 
      message: 'Failed to fetch listings',
      error: error.message 
    });
  }
};
export const getListingImages = async (req, res) => {
  try {
    const listingId = req.params.id;
    const query = `
      SELECT * FROM images 
      WHERE listing_id = ?
      ORDER BY is_primary DESC, uploaded_at DESC
    `;
    
    const images = await execute(query, [listingId]);
    
    if (!images || images.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No images found for this listing' 
      });
    }
    
    res.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Error fetching listing images:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch listing images',
      error: error.message 
    });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listingId = req.params.id;
    
    // get listing details
    const listingQuery = `
      SELECT 
        l.*,
        loc.address, 
        loc.city, 
        loc.state, 
        loc.postal_code,
        loc.country
      FROM listings l
      LEFT JOIN locations loc ON l.location_id = loc.location_id
      WHERE l.listing_id = ?
    `;
    const [listing] = await execute(listingQuery, [listingId]);
    
    if (!listing) {
      return res.status(404).json({ 
        success: false,
        message: 'Listing not found' 
      });
    }
    
    // Get listing images
    const imagesQuery = `
      SELECT * FROM images 
      WHERE listing_id = ?
      ORDER BY is_primary DESC, uploaded_at DESC
    `;
    const images = await execute(imagesQuery, [listingId]);
    
    res.json({
      success: true,
      data: {
        ...listing,
        images: images || []
      }
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

export const createListing = async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(400).json({ message: 'Invalid listing data' });
  }
};


export const updateListing = async (req, res) => {
  try {
    const updatedListing = await Listing.update(req.params.id, req.body);
    
    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(400).json({ message: 'Invalid listing data' });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const deleted = await Listing.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.json({ message: 'Listing removed' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};