import prisma from "@/lib/prisma";
import { sendReservationNotification } from "@/server/notification";

export const sendAutomaticNotification = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      departureDate: {
        lte: new Date(),
      },
      isPaid: true,
      deletedAt: null,
    },
    include: {
      notifications: true,
    },
  });

  for (const reservation of reservations) {
    const oneHourBeforeDeparture = new Date(
      reservation.departureDate.getTime() - 60 * 60 * 1000,
    );
    const oneHourAfterDeparture = new Date(
      reservation.departureDate.getTime() + 60 * 60 * 1000,
    );

    if (
      new Date() > oneHourBeforeDeparture &&
      new Date() < reservation.departureDate
    ) {
      const oldNotification = reservation.notifications.find(
        (notification) => notification.type === "RESERVATION_REMINDER",
      );
      if (oldNotification) {
        continue;
      }

      await sendReservationNotification({
        reservationId: reservation.id,
        type: "RESERVATION_REMINDER",
      });
    } else if (new Date() > oneHourAfterDeparture) {
      const oldNotification = reservation.notifications.find(
        (notification) => notification.type === "RESERVATION_THANK_YOU",
      );
      if (oldNotification) {
        continue;
      }

      await sendReservationNotification({
        reservationId: reservation.id,
        type: "RESERVATION_THANK_YOU",
      });
    }
  }
};
