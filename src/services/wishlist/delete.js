import { deleteWishlistSessionItem } from 'session/wishlist';

export default async (req) => {
  const isProductSlugDeleted = deleteWishlistSessionItem(req);
	return {
    deleted: isProductSlugDeleted,
	};
};