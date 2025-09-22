import Llibre from '../model/Llibre.js';
import Revista from '../model/Revista.js';
import Pelicula from '../model/Pelicula.js';
import Soci from '../model/Soci.js';
import Administrador from '../model/Administrador.js';

export default class Biblioteca {
    constructor() {
        this.recursos = [];
        this.socis = [];
        this.administradors = [];
    }

    // Mètodes per afegir
    afegirLlibre(titol, autor, numExemplars) {
        const llibre = new Llibre(titol, autor, numExemplars);
        this.recursos.push(llibre);
        console.log(`Llibre "${titol}" afegit amb èxit.`);
    }

    afegirPelicula(titol, director, genere, numExemplars) {
        const pelicula = new Pelicula(titol, director, genere, numExemplars);
        this.recursos.push(pelicula);
        console.log(`Pel·lícula "${titol}" afegida amb èxit.`);
    }

    afegirRevista(titol, dataPublicacio, numExemplars) {
        const revista = new Revista(titol, dataPublicacio, numExemplars);
        this.recursos.push(revista);
        console.log(`Revista "${titol}" afegida amb èxit.`);
    }

    afegirSoci(nom, dni) {
        const soci = new Soci(nom, dni);
        this.socis.push(soci);
        console.log(`Soci ${nom} afegit amb èxit.`);
    }

    afegirAdministrador(nom, dni, carrec) {
        const administrador = new Administrador(nom, dni, carrec);
        this.administradors.push(administrador);
        console.log(`Administrador ${nom} afegit amb èxit.`);
    }

    // Mètode de préstec
    prestarRecurs(dniSoci, titolRecurs) {
        const soci = this.socis.find(s => s.dni === dniSoci);
        const recurs = this.recursos.find(r => r.titol === titolRecurs);

        if (!soci) {
            console.log("Error: Soci no trobat.");
            return false;
        }

        if (!recurs) {
            console.log("Error: Recurs no trobat.");
            return false;
        }

        if (recurs instanceof Llibre && soci.llibresPrestats.length >= 3) {
            console.log("Error: Aquest soci ja ha arribat al límit de 3 llibres prestats.");
            return false;
        }

        if (recurs.numExemplars > 0) {
            recurs.numExemplars--;
            soci.llibresPrestats.push(recurs);
            console.log(` Préstec de "${recurs.titol}" a ${soci.nom} realitzat amb èxit.`);
            return true;
        } else {
            console.log(`Error: No hi ha exemplars disponibles de "${recurs.titol}".`);
            return false;
        }
    }

    // Mètode de retorn
    retornarRecurs(dniSoci, titolRecurs) {
        const soci = this.socis.find(s => s.dni === dniSoci);
        if (!soci) {
            console.log("Error: Soci no trobat.");
            return false;
        }

        const indexRecurs = soci.llibresPrestats.findIndex(r => r.titol === titolRecurs);
        if (indexRecurs === -1) {
            console.log("Error: Aquest soci no té aquest recurs prestat.");
            return false;
        }

        const recurs = soci.llibresPrestats.splice(indexRecurs, 1)[0];
        recurs.numExemplars++;
        console.log(` Retorn de "${recurs.titol}" per ${soci.nom} realitzat amb èxit.`);
        return true;
    }

    // Mètodes per a llistats
    mostrarRecursos(tipus, filtre) {
        let recursosFiltrats = this.recursos;

        if (tipus) {
            recursosFiltrats = recursosFiltrats.filter(r => {
                if (tipus === 'llibre' && r instanceof Llibre) return true;
                if (tipus === 'revista' && r instanceof Revista) return true;
                if (tipus === 'pelicula' && r instanceof Pelicula) return true;
                return false;
            });
        }
        
        if (filtre) {
            if (tipus === 'pelicula' && filtre.genere) {
                recursosFiltrats = recursosFiltrats.filter(p => p.genere.toLowerCase() === filtre.genere.toLowerCase());
            } else if (tipus === 'revista' && filtre.anyPublicacio) {
                recursosFiltrats = recursosFiltrats.filter(r => new Date(r.dataPublicacio).getFullYear() === filtre.anyPublicacio);
            }
        }

        console.log("\n--- RECURSOS DE LA BIBLIOTECA ---");
        if (recursosFiltrats.length === 0) {
            console.log("No s'han trobat recursos amb els criteris de cerca.");
        } else {
            recursosFiltrats.forEach(r => {
                console.log(r);
            });
        }
    }

    mostrarSocis() {
        console.log("\n--- SOCIS REGISTRATS ---");
        this.socis.forEach(s => console.log(s));
    }

    mostrarAdministradors() {
        console.log("\n--- ADMINISTRADORS DE PRÉSTECS ---");
        this.administradors.forEach(a => console.log(a));
    }
    
    mostrarPrestecs() {
        console.log("\n--- INFORMACIÓ SOBRE PRÉSTECS ---");
        this.socis.forEach(soci => {
            console.log(`\n- ${soci.nom} (DNI: ${soci.dni}):`);
            if (soci.llibresPrestats.length === 0) {
                console.log("  No té cap recurs prestat.");
            } else {
                soci.llibresPrestats.forEach(recurs => {
                    console.log(`  - "${recurs.titol}"`);
                });
            }
        });
    }
}

