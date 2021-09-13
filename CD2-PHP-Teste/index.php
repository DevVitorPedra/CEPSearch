<?php 
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Getting CEP</title>
</head>
<body>
            <div>
            <header>
            <img class="mk-sticky-logo mk-svg" title="" alt="" src="/">
        </header>
        </div>
        <div>
            <label for="cep">Qual cep você procura??</label>
            <input type="number" name="cep" id="cep" placeholder="ex: 88062201" required>
            <button id="apibutton">Pesquisar</button>
            <hr>
            <div class="erro hidden">
                <p>O CEP precisa conter 8 caracteres e apenas números!</p>
            </div>
        </div>
        <div id="resultado">
         
           
        </div>



<script src="script.js"></script>
</body>
</html>