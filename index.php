<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfolio de Yannick Liebnau, développeur web full-stack">
    <meta name="author" content="Yannick Liebnau">

    <!-- Script JS FontAwesome, recommandé dans la balise head sur le site officiel -->
    <script src="https://kit.fontawesome.com/5700ed8be8.js" crossorigin="anonymous"></script>

    <!-- Bootstrap CSS, utilisé pour le menu responsive -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- CSS AnimateOnScroll.js -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <!-- CSS perso -->
    <link rel="stylesheet" href="assets/css/style.css">

    <title>Yannick Liebnau - Full-Stack WebDev - Portfolio</title>
</head>

<body>

    <header id="header">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <a id="header-logo" class="navbar-brand mb-3" href="#"><img
                        src="assets/img/logoYannickLiebnau_small.png" alt="Yannick Liebnau"></a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span id="toggle-button">
                        <span class="icon-lines" id="top-line"></span>
                        <span class="icon-lines" id="middle-line"></span>
                        <span class="icon-lines" id="bottome-line"></span>
                    </span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav text-end fs-1 mb-3 m-a">
                        <li class="nav-item">
                            <a class="nav-link" href="#about">À propos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#skills">Compétences</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#work">Réalisations</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                        <li id="header-social">
                            <a href="https://instagram.com/rocknjone" target="blank"><i
                                    class="fa-brands fa-instagram"></i></a>
                            <a href="https://wa.me/0033624147408" target="blank"><i
                                    class="fa-brands fa-whatsapp"></i></a>
                            <a href="https://www.linkedin.com/in/yannickliebnau/" target="blank"><i
                                    class="fa-brands fa-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section id="home">
            <div id="home-content" class="container">
                <div id="home-logo">
                    <!-- <img src="assets/img/logoYannickLiebnau_large.png" alt="Logo Yannick Liebnau"> -->
                    <img id="lettreY" src="assets/img/Y.png" alt="Y du logo Yannick Liebnau">
                    <img id="lettreL" src="assets/img/L.png" alt="L du logo Yannick Liebnau">
                </div>
                <div id="home-txt">
                    <h1>Yannick Liebnau</h1>
                    <p>Développeur web full-stack</p>
                    <p>Lyon / Saint-Etienne</p>
                    <!-- <hr> -->
                </div>
            </div>
            <div class="section-footer-container">
                <div data-aos="flip-up" class="section-footer"></div>
            </div>
        </section>

        <!-- Section À propos -->
        <section id="about">
            <div class="container">
                <h2 data-aos="fade-right">À propos</h2>

                <div id="about-content">
                    <div data-aos="zoom-in" id="about-photo" data-photo="photo1">
                        <img id="photo1" src="assets/img/photo1.jpg" alt="Photo de profil Yannick Liebnau">
                        <img id="photo2" src="assets/img/photo2.jpg" alt="Photo de profil Yannick Liebnau">
                        <img id="photo3" src="assets/img/photo3.jpg" alt="Photo de profil Yannick Liebnau">
                        <img id="photo4" src="assets/img/photo4.jpg" alt="Photo de profil Yannick Liebnau">
                        <img id="photo5" src="assets/img/photo5.jpg" alt="Photo de profil Yannick Liebnau">
                    </div>

                    <div id="about-txt">
                        <h3 data-aos="zoom-in">Bonjour</h3>
                        <h4 data-aos="zoom-in">Moi, c'est Yannick</h4>

                        <div data-aos="fade-right" class="about-flex-txt">
                            <i class="fa-solid fa-file-code"></i>
                            <p>Spécialisé en développement
                                web & web mobile</p>
                        </div>

                        <div data-aos="fade-right" class="about-flex-txt">
                            <i class="fa-solid fa-brush"></i>
                            <p>Avec un goût prononcé pour
                                le web design</p>
                        </div>

                        <div data-aos="fade-right" class="about-flex-txt">
                            <i class="fa-solid fa-shield-halved"></i>
                            <p>Et une curiosité croissante pour
                                la cyber-sécurité</p>
                        </div>
                    </div>
                </div>

                <div data-aos="zoom-in-up" id="about-musician">
                    <p>...et musicien</p>
                    <a href="https://rocknjone.com" target="blank">
                        <i class="fa-solid fa-guitar"></i>
                    </a>
                </div>
            </div>

            <!-- Footer de fin de section -->
            <div class="section-footer-container">
                <div data-aos="flip-up" class="section-footer"></div>
            </div>
        </section>

        <!-- Section Compétences -->
        <section id="skills">
            <div class="container">
                <h2 data-aos="fade-right">Compétences</h2>

                <div id="skills-content">
                    <div id="skills-txt">
                        <p data-aos="fade-right">Après un master en localisation de contenu web, j'ai choisi de me
                            dédier au développement
                            web.
                        </p>
                        <p data-aos="fade-right">Je m'intéresse au processus complet de création d'une application web.
                            C'est pour cela que
                            j'attache autant d'importance
                            au Front qu'au Back.</p>
                        <p data-aos="fade-right">L'ergonomie UX est partie intégrante de ce processus. Je garde donc
                            toujours un oeil sur les
                            tendances web design, et
                            privilégié le 100% responsive</p>
                        <p data-aos="fade-right">Sensible à la cybersécurité, je me forme en parallèle sur la plateforme
                            TryHackMe.</p>
                    </div>

                    <!-- Barres de progression compétences -->
                    <div id="skills-progress-bars">
                        <div id="progress-front">
                            <h4>Front-End</h4>
                            <div>
                                <label>HTML/CSS</label>
                                <div class="progress">
                                    <div data-aos="fade-right" class="progress-bar" role="progressbar"
                                        style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>SASS/SCSS</label>
                                <div class="progress">
                                    <div data-aos="fade-right" class="progress-bar" role="progressbar"
                                        style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>JavaScript</label>
                                <div class="progress">
                                    <div data-aos="fade-right" class="progress-bar" role="progressbar"
                                        style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="progress-back">
                            <h4>Back-End</h4>
                            <div>
                                <label>PHP</label>
                                <div class="progress">
                                    <div data-aos="fade-right" class="progress-bar" role="progressbar"
                                        style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Symfony</label>
                                <div class="progress">
                                    <div data-aos="fade-right" class="progress-bar" role="progressbar"
                                        style="width: 85%;" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>MySQL</label>
                                <div class="progress">
                                    <div data-aos="fade-right" class="progress-bar" role="progressbar"
                                        style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Téléchargement du CV -->
                <div data-aos="zoom-in-up" id="skills-cv">
                    <p><a href="assets/img/CV_YannickLIEBNAU.pdf" target="blank"><i
                                class="fa-solid fa-file-lines"></i>Télécharger mon CV</a></p>
                </div>

            </div>
            <!-- Footer de fin de section -->
            <div class="section-footer-container">
                <div data-aos="flip-up" class="section-footer"></div>
            </div>
        </section>

        <!-- Section Réalisations -->
        <section id="work">
            <div class="container">
                <h2 data-aos="fade-right">Réalisations</h2>
            </div>

            <div class="page-container">
                <div id="work-content">
                    <div class="work-content-container">

                        <a href="http://maisonduloup.org" target="blank">
                            <h4 data-aos="fade-right">La Maison du Loup</h4>
                            <div class="work-example">
                                <div data-aos="flip-up" class="example-desktop">
                                    <img src="assets/img/work/maisonLoup_desktop.jpg"
                                        alt="Site de la maison du loup format ordinateur">
                                </div>
                                <div data-aos="flip-right" class="example-mobile">
                                    <img src="assets/img/work/maisonLoup_mobile.jpg"
                                        alt="Site de la maison du loup format smartphone">
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="work-content-container">
                        <a href="https://rocknjone.com/home" target="blank">
                            <h4 data-aos="fade-right">Jone</h4>
                            <div class="work-example">
                                <div data-aos="flip-up" class="example-desktop">
                                    <img src="assets/img/work/rocknjone_desktop.jpg"
                                        alt="Site de l'artiste Jone format ordinateur">
                                </div>
                                <div data-aos="flip-right" class="example-mobile">
                                    <img src="assets/img/work/rocknjone_mobile.jpg"
                                        alt="Site de l'artiste Jone format smartphone">
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="work-content-container">
                        <a href="https://alchimie-guitare.fr" target="blank">
                            <h4 data-aos="fade-right">Alchimie Guitare</h4>
                            <div class="work-example">
                                <div data-aos="flip-up" class="example-desktop">
                                    <img src="assets/img/work/alchimieGuitare_desktop.jpg"
                                        alt="Site de l'école de guitare alchimie guitare format ordinateur">
                                </div>
                                <div data-aos="flip-right" class="example-mobile">
                                    <img src="assets/img/work/alchimieGuitare_mobile.jpg"
                                        alt="Site de l'école de guitare alchimie guitare format smartphone">
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="work-content-container">
                        <a href="http://www.xcaretcastillo.byethost7.com/" target="blank">
                            <h4 data-aos="fade-right">Xcaret</h4>
                            <div class="work-example">
                                <div data-aos="flip-up" class="example-desktop">
                                    <img src="assets/img/work/xcaret_desktop.jpg"
                                        alt="Si'artiste designer/illustratrce Xcaret format ordinateur">
                                </div>
                                <div data-aos="flip-right" class="example-mobile">
                                    <img src="assets/img/work/xcaret_mobile.jpg"
                                        alt="Site de l'artiste designer/illustratrce Xcaret format smartphone">
                                </div>
                            </div>
                        </a>
                    </div>

                </div>
            </div>

            <!-- Footer de fin de section -->
            <div class="section-footer-container">
                <div data-aos="flip-up" class="section-footer"></div>
            </div>
        </section>

        <!-- Section Contact -->
        <section id="contact">
            <div id="contact-content" class="container">
                <h2 data-aos="fade-right">Contact</h2>

                <?php if(array_key_exists('errors', $_SESSION)): ?>
                    <div class="alert alert-danger">
                        <?= implode('<br>', $_SESSION['errors']); ?>
                    </div>
                <?php endif; ?>

                <form name="contactForm" action="contact.php" method="POST" onsubmit="validateForm()" id="contact-form">

                    <label for="name">Prénom & Nom *</label>
                    <input type="text" name="name" placeholder="Pete Townshend" id="inputname" value="">
                    <span class="error" id="errorname"></span>
                    <label for="email">E-mail *</label>
                    <input type="text" name="email" placeholder="who.are.you@who-who.com" id="inputemail" value="">
                    <span class="error" id="erroremail"></span>
                    <!-- <label for="object">Objet</label>
                    <input type="text" name="object" placeholder="Un projet génial!" id="inputname" value=""> -->
                    <label for="message">Message *</label>
                    <textarea name="message" placeholder="Écrivez votre message ici"></textarea>
                    <span class="error" id="errormsg"></span>
                    <!-- <label id="upload"><input type="file"><i class="fa-solid fa-paperclip"></i>Joindre un
                        fichier</label> -->
                    <input type="submit" id="send">
                    <!-- <input type="reset" value="Réinitialiser"> -->
                    <p>* champs requis</p>
                </form>

                <?php if(array_key_exists('success', $_SESSION)): ?>
                    <div class="alert alert-success">
                      <i class="fa-solid fa-paper-plane"></i> Votre mail a bien été envoyé
                    </div>
                <?php endif; ?>

            </div>
        </section>
    </main>

    <footer>
        <div id="footer-bg">
            <div id="footer-content" class="container">

                <div id="footer-contact">
                    <div id="footer-phone">
                        <p><a href="tel:+33658022120"><i class="fa-solid fa-mobile-retro"></i>+33 (0)6 58 02 21 20</a>
                        </p>
                        <p><a href="mailto:yannick.liebnau@gmail.com"><i
                                    class="fa-solid fa-envelope"></i>contact@yannickliebnau.com</a></p>
                    </div>

                    <div id="footer-social">
                        <a href="https://instagram.com/rocknjone" target="blank"><i
                                class="fa-brands fa-instagram"></i></a>
                        <a href="https://wa.me/0033658022120" target="blank"><i class="fa-brands fa-whatsapp"></i></a>
                        <a href="https://www.linkedin.com/in/yannickliebnau/" target="blank"><i
                                class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <div id="footer-info">
                    <p>© 2022 - yannickliebnau.com</p>
                    <p><a href="#">Cookies et mentions légales</a></p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Script Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>

    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>

    <script src="assets/js/main.js"></script>
</body>

</html>

<?php
unset($_SESSION['inputs']);
unset($_SESSION['success']);
unset($_SESSION['errors']);
?>