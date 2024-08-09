/** Different tokens params used by various endpoints */
export type TokenParams = {
  AuthToken: {
    authToken: string;
  };
  IdToken: {
    idToken: string;
  };
  EntitlementsToken: {
    entitlementsToken: string;
  };
};

/** The shard is dependent on where the Riot account was created. */
export type Shard = "na" | "eu" | "ap" | "kr" | "pbe";
