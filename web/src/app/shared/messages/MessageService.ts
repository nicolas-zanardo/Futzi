/**
 * @class  MessageService
 * Permit to create message on all services
 */

export class MessageService {

  /**
   * CREATE
   */
  static createSuccessful(msg:string): string {
    return `Création ${msg} `;
  }
  static createUnsuccessful(msg:string): string {
    return `Erreur lors de la création ${msg} `;
  }

  /**
   * UPDATE
   */
  static updateSuccessful(msg:string): string {
    return `La modification ${msg} a bien été pris en compte`;
  }
  static updateUnsuccessful(msg:string): string {
    return `Echec de la modification ${msg}`;
  };

  /**
   * SERVER
   */
  static getDataError(msg:string): string {
    return `Erreur connexion serveur : ${msg}`;
  }

  /**
   * DELETE
   */
  static  deleteSuccessful(msg:string): string {
    return `La suppression ${msg} a bien été réalisé`;
  }
  static deleteUnsuccessful(msg:string): string {
    return `Suppression impossible ${msg}`;
  }

  /**
   * TOKEN
   */
  static getTokenUnsuccessful(msg:string): string {
    return `Récupération du token impossible : ${msg}`;
  }

  /**
   * LOGIN
   */
  static loginSuccessful: string = `Vous êtes bien connecté`;
  static loginUnsuccessful: string = `Echec de la connexion le mot de passe ou le l'utilisateur n'est pas correct`;
  static loginError(msg:string): string {
    return `Erreur lors de la connexion : ${msg}`;
  }

}

