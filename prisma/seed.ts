import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
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
      vehicleType: "VAN",
      countryConfig: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
      country: "SG",
    },
  });

  const vehicleConfig2 = await prisma.vehicleConf.create({
    data: {
      baseSalary: 2500,
      vehicleType: "CAR_SUV",
      countryConfig: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
      country: "SG",
    },
  });

  const vehicleConfig3 = await prisma.vehicleConf.create({
    data: {
      baseSalary: 3000,
      vehicleType: "LORRY",
      countryConfig: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
      country: "SG",
    },
  });

  const vehicleConfig4 = await prisma.vehicleConf.create({
    data: {
      baseSalary: 1500,
      vehicleType: "MOTORCYCLE",
      countryConfig: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
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

  const driver = await prisma.driver.create({
    data: {
      licenseNumber: "SWE1234G",
      homeStation: "Sengkang",
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      vehicleType: "VAN",
      minimumGoal: 50,
      country: "SG",
    },
  });

  for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) {
      await prisma.infraction.create({
        data: {
          type: "FAKE_FAILURE",
          driver: { connect: { id: driver.id } },
          date: new Date(),
        },
      });
    } else if (i % 2 != 0 && i % 3 != 0) {
      await prisma.infraction.create({
        data: {
          type: "NO_PROOF_OF_RECEIPT",
          driver: { connect: { id: driver.id } },
          date: new Date(),
        },
      });
    }
  }

  for (let i = 0; i < 100; i++) {
    await prisma.parcel.create({
      data: {
        assignedDate: new Date(),
        deliveryDate: i % 4 == 0 ? new Date() : undefined,
        size: i % 5 == 0 ? (i % 3 == 0 ? (i % 2 == 0 ? "L" : "M") : "S") : "XS",
        recipientName: faker.name.fullName(),
        address: faker.address.streetAddress(),
        type:
          i % 3 == 0
            ? i % 2 == 0
              ? i % 5 == 0
                ? "CASH_ON_DELIVERY"
                : "CONTACTLESS"
              : "IN_PERSON"
            : "RETURN",
        driver: i % 2 == 0 ? { connect: { id: driver.id } } : undefined,
        status:
          i % 2 == 0 ? (i % 4 == 0 ? "DELIVERED" : "ATTEMPTED") : "UNDELIVERED",
        failureReason: i % 2 == 0 && i % 4 != 0 ? "CANNOT_MAKE_IT" : undefined,
      },
    });
  }

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
