export default {
    error: {
        twitchAuth: 'Problème d\'identification avec Twitch',
        selectEvent: 'Merci de sélectionner un évènement'
    },
    field: {
        required: 'Le champ est requis'
    },
    popin: {
        confirmation: {
            cancel: 'Annuler',
            confirm: 'Confirmer'
        }
    },
    event: {
        reservedToAffiliates: 'Affiliés',
        reservedToPartners: 'Partenaires',
        name: 'Nom',
        description: 'Description',
        status: 'Statut',
        current: 'Évènement en cours'
    },
    user: {
        twitchId: 'Identifiant Twitch',
        username: 'Pseudo',
        status: 'Statut',
        followers: 'Followers',
        views: 'Nombre de vues',
        score: 'Score',
        usersearch: 'Recherche par pseudo',
        email: 'Email',
        event: 'Évènement'
    },
    select: {
        unSelected: '-',
        oui: 'Oui',
        non: 'Non',
        open: 'Ouvert',
        closed: 'Fermé',
        started: 'Démarré',
        ended: 'Terminé',
        validated: 'Validé',
        awaitingEmailValidation: 'En attente de validation (mail)',
        awaitingAdminValidation: 'En attente de validation (admin)',
        refused: 'Refusé'
    },
    website: {
        detailEvent: 'Détail de l\'évènement',
        live: 'Évènement Live',
        home: 'Fight for Sub'
    },
    label: {
        joinEvent: 'Rejoindre un évènement',
        registerSuccess: 'Vous avez bien été inscrit',
        confirmEventUnregister: 'Êtes-vous sur de vouloir vous désinscrire ?',
        unregister: 'Se désinscrire',
        confirmRoundDeletion: 'Confirmez-vous la suppression du round ?',
        confirmEventDeletion: 'Confirmez-vous la suppression de l\'évènement ?',
        events: 'Évènements',
        createEvent: 'Création d\'un évènement',
        deleteEvent: 'Supprimer l\'évènement',
        recapEvent: 'Récapitulatif',
        users: 'Participants',
        livePage: 'Évènement en direct',
        eventListPage: 'Liste des événements',
        myEventsPage: 'Mes événements',
        inscriptionPage: 'Inscription',
        addUser: 'Ajouter un participant',
        editEvent: 'Modifier l\'évènement',
        updateUser: 'Modifier le participant',
        createUser: 'Ajouter un participant',
        alive: 'Liste des vivants',
        dead: 'Liste des morts',
        updateParticipant: 'Ajouter un score',
        rounds: 'Résultats des rounds',
        addRound: 'Ajouter un round',
        deleteRound: 'Supprimer le round',
        refreshResult: 'Rafraîchir les résultats',
        updateScore: 'Mettre à jour le score',
        results: 'Résultats',
        goToResults: 'Aller au classement',
        loginWelcome: 'Bienvenue,',
        deleteParticipant: 'Supprimer le participant',
        inscription: 'Inscription'
    },
    button: {
        save: 'Sauvegarder',
        saving: 'Sauvegarde en cours'
    },
    detail: {
        saved: 'Les modifications ont bien été enregistrées'
    },
    global: {
        login: {
            twitch: 'Se connecter'
        }
    },
    inscription: {
        condition: {
            all: 'Ouvert à tous',
            partnersAndAffiliates: 'Uniquement pour les affiliés et les partenaires Twitch',
            affiliates: 'Uniquement pour les affiliés Twitch',
            partners: 'Uniquement pour les partenaires Twitch'

        },
        titles: {
            explication: 'Procédure d\'inscription',
            recap: 'Récapitulatif & Validation',
            howto: 'Comment s\'inscrire ?',
            choose: 'À quel évènement souhaitez-vous participer ?'
        },
        recapPresentation: 'Vous allez participer à l\'évènement avec le compte suivant :',
        remind: 'Un rappel avec les détails de l\'évènement vous sera envoyé peu de temps avant le début de celui-ci.',
        unsubscribe: 'Vous pouvez vous désinscrire d\'un évènement depuis la page de détail de l\'évènement.',
        explication: {
            detail: [
                'Sélectionnez ci-dessous l\'évènement auquel vous souhaitez participer puis validez',
                'Après validation, vous allez recevoir un mail de confirmation sur l\'adresse affichée dans le récapitulatif',
                'Une fois votre inscription validée par les administrateurs, vous recevrez un second mail. Vous êtes alors inscrit !'
            ]
        }
    },
    home: {
        titles: {
            whatIsIt: 'Qu\'est-ce que Fight for Sub ?',
            rules: 'Les règles',
            basicRules: 'Les règles de base',
            handicap: 'Handicap pour certains joueurs'
        },
        paragraphs: {
            game: 'Une centaine de streamers s\'affrontent lors d\'une compétition tous les mois sur le jeu PlayerUnknow\'s Battlegrounds, organisée et commentée par Zerator.',
            sub: 'Tous les participants de la compétition doivent s\'abonner à la chaine Twitch du vainqueur.',
            rules: [
                '3 parties (4 en cas d\'égalité au bout de 3 parties)',
                'Une fois par mois',
                'Uniquement des streamers (affiliate ou partner)',
                'La moyenne de votre classement dans les 3 games détermine votre place finale (ce qui veut dire que quelqu\'un qui fait TOP 3 - TOP 3 - TOP 3 gagnes face à quelqu\'un qui fait TOP 1 / TOP 1 / TOP 10)',
                'Les kills ne changent rien aux points',
                'Mode : TPP (non FPP)',
                'Solo only, pas de duo ni de squad',
                'Si vous êtes dans le top 15, vous devez fermer votre t\'chat de stream.',
                'Quand le gagnant sera désigné, il faudra vous abonner à lui EN LIVE devant vos viewers avant de cut le live'
            ],
            handicaps: [
                'Pas de stuff T2 / T3 SAUF casque T2',
                'Pas d\'utilisation de Painkiller/Boissons/Adrenaline Syringe',
                'Pas le droit de loot le drop ni de loot sur quelqu\'un les objects suivants (AWM, M24, Mk14 EBR, M249, Groza, Ghillie Suit)',
                'Pas d\'utilisation ni de 8x, ni de 15x'
            ]
        }
    },
    events: {
        titles: {
            noEvent: 'Aucun événement'
        },
        paragraphs: {
            noEvent: 'Vous n\'êtes pas inscrit ou n\'avez participé à aucun événement pour le moment.',
            noEventItem: 'Aucun événement disponible actuellement.'
        },
        buttons: {
            signInEvent: 'S\'inscrire à un événement'
        }
    }
};
