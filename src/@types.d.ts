export type User = {
  token: string;
  uid: string;
  accessToken: string;
  expirationTime: number;
  expired: number;
  refreshToken: string;
};
export type tokenType = {
  accessToken: string;
};

// height
export type heightFeetType = { feet: number; inch: number };
export type heightType = { cm: number; mt: number; feet: heightFeetType };

// weight
export type weightType = { kg: number; pounds: number };

export type adjustedBodyWeightType = { kg: number; pounds: number };
export type bloodVolumnType = { value: number; unit: string };
export type bodyWaterWeightType = { kg: number; pounds: number };
export type idealWeightType = { kg: number; pounds: number };
export type leanBodyMassType = { kg: number; pounds: number };
export type rmrType = { value: number; unit: string };

export type localListType = {
  age: number;
  bmi: number;
  sex: string;
  height: heightType;
  weight: weightType;
  adjustedBodyWeight: adjustedBodyWeightType;
  bloodVolumn: bloodVolumnType;
  bodyWaterWeight: bodyWaterWeightType;
  idealWeight: idealWeightType;
  leanBodyMass: leanBodyMassType;
  name: string;
  position: string;
  rmr: rmrType;
  sport: string;
};
