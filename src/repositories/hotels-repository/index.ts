import { prisma } from "@/config";

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getByHotelId(hotelId: number) {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true }
  });
}

const hotelsRepository = {
  getHotels,
  getByHotelId
}

export default hotelsRepository;