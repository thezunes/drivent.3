import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';


async function getHotels(userId: number) {

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw {
      name: 'PaymentRequired',
      message: 'Payment is required',
    };
  }

  const hotels = await hotelsRepository.getHotels();
  if (!hotels.length || !hotels) throw notFoundError();
  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {

    const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollmentWithAddress) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentWithAddress.id);
    if (!ticket) throw notFoundError();

    const hotel = await hotelsRepository.getByHotelId(hotelId);

    if (!hotel) throw notFoundError();
    return hotel;
  }

const hotelsService = {
  getHotels,
  getHotelById,
};

export default hotelsService;