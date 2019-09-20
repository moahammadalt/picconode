import { deleteWishlistSessionItem } from 'session/wishList';

export default async (req) => {
  const isProductSlugDeleted = deleteWishlistSessionItem(req);
	return {
    deleted: isProductSlugDeleted,
	};
};