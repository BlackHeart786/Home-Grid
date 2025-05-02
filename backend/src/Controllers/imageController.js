// controllers/imageController.js
import Image from '../Models/Image.js';
import { execute } from "../config/db.js";

export const getListingImages = async (req, res) => {
  try {
    const images = await Image.findByListingId(req.params.listingId);
    
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
export const setPrimaryImage = async (req, res) => {
  try {
    const { imageId, listingId } = req.params;
    const success = await Image.setPrimary(imageId, listingId);
    
    if (!success) {
      return res.status(404).json({ 
        success: false,
        message: 'Image not found or update failed' 
      });
    }
    
    res.json({
      success: true,
      message: 'Primary image updated successfully'
    });
  } catch (error) {
    console.error('Error setting primary image:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to set primary image',
      error: error.message 
    });
  }
};

// New controller to get ALL images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    
    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No images found' });
    }
    
    res.json(images);
  } catch (error) {
    console.error('Error fetching all images:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPrimaryImage = async (req, res) => {
  try {
    const { listingId } = req.params;
    const image = await Image.findPrimaryByListingId(listingId) || 
                  await Image.findAnyByListingId(listingId);
    
    if (!image) {
      return res.status(404).json({ 
        message: 'No images found',
        placeholder: '/default-image.jpg'
      });
    }
    
    res.json(image);
  } catch (error) {
    console.error('Error fetching primary image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};