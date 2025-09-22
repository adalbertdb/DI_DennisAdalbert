// Aquest fitxer conté el bucle principal per a la interacció amb l'usuari.
import readline from 'readline';
import Biblioteca from './controller/biblioteca.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const biblioteca = new Biblioteca();

// Funció per mostrar el menú i gestionar la lògica de l'aplicació
function mostrarMenu() {
    console.log("\n==================================");
    console.log("     SISTEMA DE GESTIÓ DE BIBLIOTECA");
    console.log("==================================");
    console.log("1. Afegir un recurs (Llibre, Revista, Pel·lícula)");
    console.log("2. Afegir un soci");
    console.log("3. Afegir un administrador");
    console.log("4. Prestar un recurs a un soci");
    console.log("5. Retornar un recurs");
    console.log("6. Llistar recursos");
    console.log("7. Llistar socis");
    console.log("8. Llistar administradors");
    console.log("9. Llistar préstecs per soci");
    console.log("0. Sortir");
    console.log("==================================");

    rl.question('Selecciona una opció: ', (opcio) => {
        switch (opcio) {
            case '1':
                afegirRecurs();
                break;
            case '2':
                afegirSoci();
                break;
            case '3':
                afegirAdministrador();
                break;
            case '4':
                prestarRecurs();
                break;
            case '5':
                retornarRecurs();
                break;
            case '6':
                llistarRecursos();
                break;
            case '7':
                biblioteca.mostrarSocis();
                mostrarMenu();
                break;
            case '8':
                biblioteca.mostrarAdministradors();
                mostrarMenu();
                break;
            case '9':
                biblioteca.mostrarPrestecs();
                mostrarMenu();
                break;
            case '0':
                console.log("Gràcies per utilitzar el sistema de gestió de biblioteca. Adéu!");
                rl.close();
                break;
            default:
                console.log("Opció no vàlida. Torna a intentar-ho.");
                mostrarMenu();
                break;
        }
    });
}

function afegirRecurs() {
    rl.question('Tipus de recurs (llibre, revista, pelicula): ', (tipus) => {
        if (tipus === 'llibre') {
            rl.question('Títol: ', (titol) => {
                rl.question('Autor: ', (autor) => {
                    rl.question('Exemplars: ', (numExemplars) => {
                        biblioteca.afegirLlibre(titol, autor, parseInt(numExemplars));
                        mostrarMenu();
                    });
                });
            });
        } else if (tipus === 'revista') {
            rl.question('Títol: ', (titol) => {
                rl.question('Data de publicació (YYYY-MM-DD): ', (data) => {
                    rl.question('Exemplars: ', (numExemplars) => {
                        biblioteca.afegirRevista(titol, data, parseInt(numExemplars));
                        mostrarMenu();
                    });
                });
            });
        } else if (tipus === 'pelicula') {
            rl.question('Títol: ', (titol) => {
                rl.question('Director: ', (director) => {
                    rl.question('Gènere: ', (genere) => {
                        rl.question('Exemplars: ', (numExemplars) => {
                            biblioteca.afegirPelicula(titol, director, genere, parseInt(numExemplars));
                            mostrarMenu();
                        });
                    });
                });
            });
        } else {
            console.log("Tipus de recurs no vàlid.");
            mostrarMenu();
        }
    });
}

function afegirSoci() {
    rl.question('Nom del soci: ', (nom) => {
        rl.question('DNI del soci: ', (dni) => {
            biblioteca.afegirSoci(nom, dni);
            mostrarMenu();
        });
    });
}

function afegirAdministrador() {
    rl.question('Nom de l\'administrador: ', (nom) => {
        rl.question('DNI de l\'administrador: ', (dni) => {
            rl.question('Càrrec (administrador/ajudant): ', (carrec) => {
                biblioteca.afegirAdministrador(nom, dni, carrec);
                mostrarMenu();
            });
        });
    });
}

function prestarRecurs() {
    rl.question('DNI del soci: ', (dniSoci) => {
        rl.question('Títol del recurs: ', (titolRecurs) => {
            biblioteca.prestarRecurs(dniSoci, titolRecurs);
            mostrarMenu();
        });
    });
}

function retornarRecurs() {
    rl.question('DNI del soci: ', (dniSoci) => {
        rl.question('Títol del recurs a retornar: ', (titolRecurs) => {
            biblioteca.retornarRecurs(dniSoci, titolRecurs);
            mostrarMenu();
        });
    });
}

function llistarRecursos() {
    rl.question('Vols filtrar per tipus? (llibre, revista, pelicula o "no"): ', (tipus) => {
        if (tipus === 'no') {
            biblioteca.mostrarRecursos();
            mostrarMenu();
        } else if (tipus === 'revista') {
            rl.question('Any de publicació (YYYY) o "no": ', (any) => {
                const filtre = any === 'no' ? null : { anyPublicacio: parseInt(any) };
                biblioteca.mostrarRecursos(tipus, filtre);
                mostrarMenu();
            });
        } else if (tipus === 'pelicula') {
            rl.question('Gènere o "no": ', (genere) => {
                const filtre = genere === 'no' ? null : { genere };
                biblioteca.mostrarRecursos(tipus, filtre);
                mostrarMenu();
            });
        } else {
            biblioteca.mostrarRecursos(tipus);
            mostrarMenu();
        }
    });
}

//dades d'exemple


// Iniciar l'aplicació
mostrarMenu();