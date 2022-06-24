<?php 

if(!array_key_exists('name', $_POST) || $_POST['name'] == ''){
    $errors['name'] = "Merci de renseigner vos nom et prénom.";
} 
if(!array_key_exists('email', $_POST) || $_POST['email'] == '' || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
    $errors['email'] = "Merci de renseigner un email valide";
}
if(!array_key_exists('message', $_POST) || $_POST['message'] == ''){
    $errors['message'] = "Ecrivez quelques lignes pour préciser la raison de votre message :) .";
}

    session_start();

if(!empty($errors)){
    $_SESSION['errors'] = $errors;
    $_SESSION['inputs'] = $_POST;
    header('Location: index.php#contact');
}else{
    $_SESSION['success'] = 1;
    $headers = 'FROM: ' . $_POST['email'];
    mail('contact@yannickliebnau.com', 'Message de ' . $_POST['name'], $_POST['message'], $headers);
    header('Location: index.php#contact');
}

?>