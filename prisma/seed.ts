import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Configs
  const countryConfig = await prisma.countryConf.create({
    data: {
      country: "SG",
      isInfractionVisible: true,
    },
  });

  const vehicleConfig = await prisma.vehicleConf.create({
    data: {
      baseSalary: 2000,
      sizeBonus: 2.0,
      cashOnDeliveryBonus: 2.5,
      accessibilityBonus: 2.7,
      priorityBonus: 2.3,
      timeSlotBonus: 1.5,
      country: "SG",
    },
  });
  // Drivers
  // Orders
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
