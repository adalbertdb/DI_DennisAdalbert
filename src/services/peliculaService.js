import {pool} from "../config/database.js";

export async function getPeliculas() {
    const [rows] =  await pool.query("SELECT * FROM vw_peliculas");
    return rows;
}

export async function getPeliculaById(id) {
    const [rows] =  await pool.query("SELECT * FROM vw_peliculas WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

export async function createPelicula(pelicula) {
    if (!pelicula) {
        throw new Error("Pelicula data is missing");
    }
    const { titulo, num_ejemplares, director, genero } = pelicula;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [resultRecurso] = await connection.execute(
            "INSERT INTO recursos (tipo, titulo, num_ejemplares) VALUES (?, ?, ?)",
            [2, titulo, num_ejemplares]
        );
        const idRecurso = resultRecurso.insertId;

        await connection.execute(
            "INSERT INTO peliculas (id, director, genero) VALUES (?, ?, ?)",
            [idRecurso, director, genero]
        );

        await connection.commit();
        return { id: idRecurso, ...pelicula };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function updatePelicula(id, pelicula) {
    const { titulo, num_ejemplares, director, genero } = pelicula;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute(
            "UPDATE recursos SET titulo = ?, num_ejemplares = ? WHERE id = ?",
            [titulo, num_ejemplares, id]
        );

        await connection.execute(
            "UPDATE peliculas SET director = ?, genero = ? WHERE id = ?",
            [director, genero, id]
        );

        await connection.commit();
        return { id, ...pelicula };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function deletePelicula(id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute("DELETE FROM peliculas WHERE id = ?", [id]);
        await connection.execute("DELETE FROM recursos WHERE id = ?", [id]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
