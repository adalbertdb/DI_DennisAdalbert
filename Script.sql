CREATE DATABASE biblioteca 
	CHARACTER SET utf8mb4 
	COLLATE utf8mb4_general_ci;
USE biblioteca;


 -- TABLA PADRE MATERIALES Y SUS SUBTABLAS
CREATE TABLE materiales(
	material_id INT AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(50),
	f_lanzamiento DATE,
	n_ejemplares INT,
	tipo VARCHAR(50) NOT NULL
);

CREATE TABLE libros(
	material_id INT PRIMARY KEY,
	autor VARCHAR(20),
	ISBN VARCHAR(20),
	paginas INT,
	FOREIGN KEY (material_id) REFERENCES materiales (material_id)
);

CREATE TABLE peliculas (
	material_id INT PRIMARY KEY,
	director VARCHAR(20),
	duracion INT, -- en minutos
	FOREIGN KEY (material_id) REFERENCES materiales (material_id)
);

CREATE TABLE revistas (
	material_id INT PRIMARY KEY,
	FOREIGN KEY (material_id) REFERENCES materiales (material_id)
);

-- TABLA PADRE PERSONAS Y SUBLCASES
CREATE TABLE personas (
	persona_id INT AUTO_INCREMENT PRIMARY KEY,
	DNI VARCHAR(9), -- tambien sirve para NIE
	nombre VARCHAR(20),
	apellido VARCHAR(20)
);

CREATE TABLE soci (
	soci_id INT PRIMARY KEY,
	FOREIGN KEY (soci_id) REFERENCES personas (persona_id)
);

CREATE TABLE administrador(
	persona_id INT PRIMARY KEY,
	rol ENUM( "ajudant" , "administrador"),
	FOREIGN KEY (persona_id) REFERENCES personas (persona_id)
);

-- TABLA PRESTAMOS
CREATE TABLE prestamos(
	prestamos_id INT AUTO_INCREMENT PRIMARY KEY,
	persona_id INT NOT NULL,
	material_id INT NOT NULL,
	fecha_prestamo DATE NOT NULL,
	fecha_devolución DATE,
	estado ENUM("PRESTADO, DEVUELTO, RETRASADO") DEFAULT("PRESTADO"),
	FOREIGN KEY (persona_id) REFERENCES personas (persona_id),
	FOREIGN KEY (material_id) REFERENCES materiales (material_id)
);

DROP DATABASE biblioteca;