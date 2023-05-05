export enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
  BAN = "BAN"
}

export enum SetROLE {
  BANNI     = '["USER", "BAN"]',
  MEMBRE    = '["USER", "ADMIN"]',
  DEMANDE   = '["USER"]',
  SUPPRIMER = '["DELETE"]'
}
