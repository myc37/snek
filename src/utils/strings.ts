import { InfractionType, PackageBonusType } from "@prisma/client";

export const mapInfractionType = (type: InfractionType) => {
  switch (type) {
    case InfractionType.NO_PROOF_OF_RECEIPT: {
      return "No proof of receipt";
    }
    case InfractionType.FAKE_FAILURE: {
      return "Fake failure";
    }
  }
};

export const mapBonusType = (type: PackageBonusType) => {
  switch (type) {
    case PackageBonusType.CASH_ON_DELIVERY: {
      return "Cash on delivery";
    }
    case PackageBonusType.L_SIZE: {
      return "L-size";
    }
    case PackageBonusType.RETURN_PACKAGE: {
      return "Return package";
    }
  }
};
