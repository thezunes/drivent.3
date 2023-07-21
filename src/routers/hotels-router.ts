import { Router } from 'express';
import hotelsController from '../controllers/hotels-controller';
import { authenticateToken } from '../middlewares';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/hotels', hotelsController.getHotels)
  .get('/hotels/:hotelId', hotelsController.getHotelsById)
 
export { hotelsRouter };
