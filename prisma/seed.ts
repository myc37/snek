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

  if (!countryConfig) throw new Error("country config not created");

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

  if (!vehicleConfig) throw new Error("veh config not created");

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

  if (!vehicleConfig2) throw new Error("veh config2 not created");

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

  if (!vehicleConfig3) throw new Error("veh config3 not created");

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

  if (!vehicleConfig4) throw new Error("veh config4 not created");

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

  if (!fakeFailureInfraction) throw new Error("ffi not created");

  const noReceiptInfraction = await prisma.infractionPayStructure.create({
    data: {
      countryConf: {
        connect: { countryConfigId: countryConfig.countryConfigId },
      },
      infractionType: "NO_PROOF_OF_RECEIPT",
      deduction: 0.1,
    },
  });

  if (!noReceiptInfraction) throw new Error("nri not created");

  const incentivePayStructure1 = await prisma.incentivePayStructure.create({
    data: {
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      targetPackages: 20,
      bonusPayment: 50,
    },
  });

  if (!incentivePayStructure1) throw new Error("ips not created");

  const incentivePayStructure2 = await prisma.incentivePayStructure.create({
    data: {
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      targetPackages: 30,
      bonusPayment: 70,
    },
  });

  if (!incentivePayStructure2) throw new Error("ips2 not created");

  const incentivePayStructure3 = await prisma.incentivePayStructure.create({
    data: {
      vehicleConfig: {
        connect: { vehicleConfigId: vehicleConfig.vehicleConfigId },
      },
      targetPackages: 40,
      bonusPayment: 100,
    },
  });

  if (!incentivePayStructure3) throw new Error("ips3 not created");

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

  if (!packageTypeBonusStructure1) throw new Error("ptbs1 not created");

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

  if (!packageTypeBonusStructure2) throw new Error("ptbs2 not created");

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

  if (!packageTypeBonusStructure3) throw new Error("ptbs3 not created");

  await prisma.driver
    .create({
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
    })
    .then(async (driver) => {
      if (!driver) throw new Error("driver not created");
      else console.log("did: ", driver.id);

      for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
          const inf = await prisma.infraction.create({
            data: {
              type: "FAKE_FAILURE",
              driver: { connect: { id: driver.id } },
              date: new Date(),
            },
          });
          if (!inf) throw new Error(`inf ${i} not created`);
        } else if (i % 2 != 0 && i % 3 != 0) {
          const inf = await prisma.infraction.create({
            data: {
              type: "NO_PROOF_OF_RECEIPT",
              driver: { connect: { id: driver.id } },
              date: new Date(),
            },
          });
          if (!inf) throw new Error(`inf ${i} not created`);
        }
      }

      for (let i = 0; i < 100; i++) {
        const parcel = await prisma.parcel.create({
          data: {
            assignedDate: new Date(),
            deliveryDate: i % 4 == 0 ? new Date() : undefined,
            size:
              i % 5 == 0 ? (i % 3 == 0 ? (i % 2 == 0 ? "L" : "M") : "S") : "XS",
            recipientName: faker.name.fullName(),
            address: faker.address.streetAddress(),
            type:
              i % 3 == 0
                ? i % 2 == 0
                  ? "RETURN"
                  : "CONTACTLESS"
                : "IN_PERSON",
            driver: { connect: { id: driver.id } },
            status:
              i % 2 == 0
                ? i % 4 == 0
                  ? "DELIVERED"
                  : "ATTEMPTED"
                : "UNDELIVERED",
            failureReason:
              i % 2 == 0 && i % 4 != 0 ? "CANNOT_MAKE_IT" : undefined,
          },
        });
        if (!parcel) throw new Error(`parcel ${i} not created`);
      }
    });
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
