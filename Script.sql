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

-- TRIGGERS

DELIMITER $$
CREATE TRIGGER comprobarDisponibilidad
BEFORE INSERT ON prestamos
FOR EACH ROW
BEGIN 
	DECLARE disponibles INT;
	SELECT n_ejemplares INTO disponibles
	FROM materiales
	WHERE material_id = NEW.material_id;

	IF disponibles >=0 THEN
		SIGNAL SQLSTATE "4500"
			SET MESAGE_TEXT="NO QUEDAN EJEMPLARES DISPONIBLES PARA ESTE RECURSO";
	END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE TRIGGER prestar_libro
AFTER INSERT ON prestamos
FOR EACH ROW 
BEGIN 
	UPDATE materiales
	SET n_ejemplares = n_ejemplares -1
	WHERE material_id = NEW.material_id;

END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER devolver_libro
AFTER UPDATE ON prestamos
FOR EACH ROW 
BEGIN 
	IF OLD.fecha_devolucion IS NULL AND NEW.fecha_devolucion IS NOT NULL THEN
		UPDATE materiales
		SET n_ejemplares = n_ejemplares +1
		WHERE material_id = NEW.material_id;
	END IF
END$$
DELIMITER ;

DROP DATABASE biblioteca;