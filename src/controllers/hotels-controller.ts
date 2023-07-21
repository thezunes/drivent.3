import { Response } from 'express';
import httpStatus from 'http-status';
import hotelsService from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';

async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

async function getHotelsById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const { userId } = req; 

  try {
    const hotel = await hotelsService.getHotelsByHotelId(hotelId, userId);
    res.status(httpStatus.OK).send(hotel);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const hotelsController = {
  getHotels,
  getHotelsById,
};

export default hotelsController;