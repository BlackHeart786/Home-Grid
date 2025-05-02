import { execute } from '../config/db.js';

const Listing = {
  // Get all listings with primary images
  findAll: async () => {
    const query = `
      SELECT 
        l.listing_id,
        l.owner_id,
        l.title,
        l.type,
        l.security_deposit,
        l.availability_status,
        l.created_at,
        loc.city,
        loc.state,
        loc.country,
        img.image_url as primary_image
      FROM listings l
      LEFT JOIN locations loc ON l.location_id = loc.location_id
      LEFT JOIN (
        SELECT listing_id, image_url 
        FROM images 
        WHERE is_primary = 1
      ) img ON l.listing_id = img.listing_id
    `;
    return await execute(query);
  },

  // Get listing by ID with full details
  findById: async (id) => {
    const listingQuery = `
      SELECT 
        l.*,
        loc.address, 
        loc.city, 
        loc.state, 
        loc.postal_code,
        loc.country,
        u.name as owner_name,
        u.email as owner_email
      FROM listings l
      LEFT JOIN locations loc ON l.location_id = loc.location_id
      LEFT JOIN users u ON l.owner_id = u.user_id
      WHERE l.listing_id = ?
    `;
    
    const imagesQuery = `
      SELECT * FROM images 
      WHERE listing_id = ?
      ORDER BY is_primary DESC, uploaded_at DESC
    `;

    try {
      const [listing] = await execute(listingQuery, [id]);
      if (!listing) return null;

      const images = await execute(imagesQuery, [id]);
      return { ...listing, images };
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  },

  create: async (listingData) => {
  },

  update: async (id, listingData) => {
  },

  delete: async (id) => {
  }
};

export default Listing;