import { execute } from '../config/db.js';

const Image = {
  findAll: async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const query = `
      SELECT 
        image_id, 
        listing_id, 
        user_id,
        image_url, 
        caption,
        is_primary, 
        uploaded_at
      FROM images 
      ORDER BY uploaded_at DESC
      LIMIT ? OFFSET ?
    `;
    return await execute(query, [limit, offset]);
  },

  // Get count of ALL images
  countAll: async () => {
    const query = `SELECT COUNT(*) as total FROM images`;
    const [result] = await execute(query);
    return result.total;
  },

    findByListingId: async (listingId) => {
    const query = `
      SELECT * FROM images 
      WHERE listing_id = ?
      ORDER BY is_primary DESC, uploaded_at DESC
    `;
    return await execute(query, [listingId]);
  },

  setPrimary: async (imageId, listingId) => {
    // First reset all primary flags for this listing
    await execute(
      `UPDATE images SET is_primary = 0 WHERE listing_id = ?`,
      [listingId]
    );
    
    // Set the new primary image
    const result = await execute(
      `UPDATE images SET is_primary = 1 WHERE image_id = ? AND listing_id = ?`,
      [imageId, listingId]
    );
    
    return result.affectedRows > 0;
  }
};

export default Image;
