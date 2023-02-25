import { InfractionType, PrismaClient } from "@prisma/client";
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

  const fakeFailureInfraction = await prisma.infractionPayStructure.create({
    data: {
      countryConf: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
      infractionType: "FAKE_FAILURE",
      deduction: 1.0,
    },
  });

  const noReceiptInfraction = await prisma.infractionPayStructure.create({
    data: {
      countryConf: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
      infractionType: "NO_PROOF_OF_RECEIPT",
      deduction: 0.1,
    },
  });

  const incentivePayStructure1 = await prisma.incentivePayStructure.create({
    data: {
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      targetPackages: 20,
      bonusPayment: 50,
    },
  });

  const incentivePayStructure2 = await prisma.incentivePayStructure.create({
    data: {
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      targetPackages: 30,
      bonusPayment: 70,
    },
  });

  const incentivePayStructure3 = await prisma.incentivePayStructure.create({
    data: {
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      targetPackages: 40,
      bonusPayment: 100,
    },
  });

  const packageTypeBonusStructure1 =
    await prisma.packageTypeBonusStructure.create({
      data: {
        vehicleConfig: {
          connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
        },
        packageType: "CASH_ON_DELIVERY",
        bonus: 2,
      },
    });

  const packageTypeBonusStructure2 =
    await prisma.packageTypeBonusStructure.create({
      data: {
        vehicleConfig: {
          connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
        },
        packageType: "L_SIZE",
        bonus: 4,
      },
    });

  const packageTypeBonusStructure3 =
    await prisma.packageTypeBonusStructure.create({
      data: {
        vehicleConfig: {
          connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
        },
        packageType: "RETURN_PACKAGE",
        bonus: 1.5,
      },
    });

  const driver = await prisma.driver.create({});

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
