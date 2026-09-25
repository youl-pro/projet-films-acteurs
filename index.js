$(function() { // Exécute le code une fois que le DOM est complètement chargé

    // Sélectionne tous les éléments <li> du menu principal
    var $mainMenuItems = $("#main-menu ul").children("li"),

        // Stocke le nombre total d'items du menu
        totalMainMenuItems = $mainMenuItems.length,

        // Détermine l'élément à ouvrir par défaut (2e index ici)
        openedIndex = 2;

    // Fonction d'initialisation au chargement
    var init = function() {
        bindEvent(); // Active les événements de clic et hover
        // Si l'index initial est valide, ouvre l'élément correspondant
        if (validIndex(openedIndex))
            animateItem($mainMenuItems.eq(openedIndex), true, 700);
    },

    // Fonction pour attacher tous les événements
    bindEvent = function() {

        // Lorsqu'on clique sur une image dans le menu
        $mainMenuItems.children(".images").click(function() {

            // Récupère l'index du parent <li> de l'image cliquée
            var newIndex = $(this).parent().index(),

                // Récupère l'élément <li> à cet index
                $item = $mainMenuItems.eq(newIndex);

            // Vérifie et anime l'élément cliqué
            checkAndAnimateItem(newIndex);
        });

        // Lorsqu'on survole un élément avec la classe .button
        $(".button").hover(
            function() {
                // Ajoute une classe CSS pour l'effet de survol
                $(this).addClass("hovered");
            }, 
            function() {
                // Retire la classe CSS quand le curseur quitte
                $(this).removeClass("hovered");
            }
        );

        // Lorsqu'on clique sur une .button (ex : flèches ou contrôles)
        $(".button").click(function() {
            // Récupère son index dans la liste de boutons
            var newIndex = $(this).index();

            // Vérifie et anime l'élément du menu correspondant
            checkAndAnimateItem(newIndex);
        });
    },

    // Vérifie que l'index est dans les bornes du tableau
    validIndex = function(indexToCheck) {
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
    },

    // Anime l'ouverture ou la fermeture d'un élément de menu
    animateItem = function($item, toOpen, speed) {

        // Sélectionne l'image en couleur dans l'élément
        var $colorImage = $item.find(".color"),

            // Définit la largeur à animer selon l'état
            itemParam = toOpen ? { width: '420px' } : { width: '140px' },

            // Définit la position de l'image en couleur
            colorImageParam = toOpen ? { left: '0px' } : { left: '140px' };

        // Anime l'image couleur (glissement)
        $colorImage.animate(colorImageParam, speed);

        // Anime l'ouverture/fermeture de l'élément <li>
        $item.animate(itemParam, speed);
    },

    // Vérifie quel élément ouvrir ou fermer en fonction de l'index
    checkAndAnimateItem = function(indexToCheckAndAnimate) {

        // Si on clique sur l'élément déjà ouvert
        if (openedIndex === indexToCheckAndAnimate) {
            // Le referme
            animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
            // Réinitialise l'état (aucun ouvert)
            openedIndex = -1;
        } else {
            // Si l'index est valide
            if (validIndex(indexToCheckAndAnimate)) {

                // Ferme l'élément actuellement ouvert (s'il y en a un)
                animateItem($mainMenuItems.eq(openedIndex), false, 250);

                // Met à jour l'index de l'élément ouvert
                openedIndex = indexToCheckAndAnimate;

                // Ouvre le nouvel élément sélectionné
                animateItem($mainMenuItems.eq(openedIndex), true, 250);
            }
        }
    }

    // Lance l'initialisation dès que le DOM est prêt
    init();
});
