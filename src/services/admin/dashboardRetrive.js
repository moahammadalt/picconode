
import { select } from "utils/db";
export default async (req) => {
  try {
    
    return {
      productsBrief: {
        women: {
          count: 20,
          lastAddedProductName: 'nice dress',
          lastAddedProductLink: '/nice-dress',
          lastAddedProductDate: '2019-12-12',
        },
        kids: {
          count: 20,
          lastAddedProductName: 'nice kid',
          lastAddedProductLink: '/nice-kid',
          lastAddedProductDate: '2019-12-13',
        }
      },
      productsRequestsCount: 45,
    }
  } catch (err) {
    throw err;
  }
};
