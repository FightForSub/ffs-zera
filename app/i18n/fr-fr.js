export default {
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
        usersearch: 'Recherche par pseudo'
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
        events: 'Évènements',
        createEvent: 'Création d\'un évènement',
        recapEvent: 'Récapitulatif',
        users: 'Participants',
        livePage: 'Direct',
        eventListPage: 'Évènements',
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
        loginWelcome: 'Bienvenue,'
    },
    button: {
        save: 'Sauvegarder'
    },
    detail: {
        saved: 'Les modifications ont bien été enregistrées'
    },
    global: {
        login: {
            twitch: 'Se connecter'
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
    }
};
