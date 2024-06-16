export class BookingDTO { 
       id: string;
       reserveDate: Date;
       checkoutDate:Date;
       lastUpdated: Date;
       guestId: string;
       hotelId: string;
       hotel: { name: string };
       guest: { firstName: string, lastName: string };
}
