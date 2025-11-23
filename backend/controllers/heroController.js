import {
  createHeroDB,
  deleteHeroDB,
  getAllHeroDB,
  getHeroByIdDB,
  toggleHeroTextoDB,
  updateHeroDB,
} from "../models/hero.js";

import { deleteFile } from "../utils/deleteFiles.js";
import fs from "fs";

// GET
export const getHero = async (req, res) => {
  try {
    const heroes = await getAllHeroDB();
    res.json(heroes);
  } catch (err) {
    console.error("Error en getHero:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// POST
export const postHero = async (req, res) => {
  try {
    const { titulo, subtitulo } = req.body;
    const imagen_light = req.files?.["imagen_light"]?.[0]?.filename || null;
    const imagen_dark = req.files?.["imagen_dark"]?.[0]?.filename || null;
    const logo_light = req.files?.["logo_light"]?.[0]?.filename || null;
    const logo_dark = req.files?.["logo_dark"]?.[0]?.filename || null;

    const mostrar_texto = req.body?.mostrar_texto === "true" || req.body?.mostrar_texto === true;

    const hero = await createHeroDB(
      titulo,
      subtitulo,
      imagen_light,
      imagen_dark,
      logo_light,
      logo_dark,
      mostrar_texto
    );

    res.json(hero);
  } catch (err) {
    console.error("Error en postHero:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// PUT
export const updateHero = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await getHeroByIdDB(id);
    if (!existing) return res.status(404).json({ error: "Hero no encontrado" });

    // Si llegan nuevas imágenes, borrar anteriores
    const imagen_light = req.files?.["imagen_light"] ? (deleteFile(existing.imagen_light), req.files["imagen_light"][0].filename) : existing.imagen_light;
    const imagen_dark = req.files?.["imagen_dark"] ? (deleteFile(existing.imagen_dark), req.files["imagen_dark"][0].filename) : existing.imagen_dark;
    const logo_light = req.files?.["logo_light"] ? (deleteFile(existing.logo_light), req.files["logo_light"][0].filename) : existing.logo_light;
    const logo_dark = req.files?.["logo_dark"] ? (deleteFile(existing.logo_dark), req.files["logo_dark"][0].filename) : existing.logo_dark;

    const titulo = req.body?.titulo || existing.titulo;
    const subtitulo = req.body?.subtitulo || existing.subtitulo;
    const mostrar_texto = req.body?.mostrar_texto !== undefined
      ? req.body.mostrar_texto === "true" || req.body.mostrar_texto === true
      : existing.mostrar_texto;

    const updated = await updateHeroDB(
      id,
      titulo,
      subtitulo,
      imagen_light,
      imagen_dark,
      logo_light,
      logo_dark,
      mostrar_texto
    );

    res.json(updated);
  } catch (err) {
    console.error("Error en updateHero:", err);
    res.status(500).json({ error: "Error al actualizar hero" });
  }
};

// DELETE
export const deleteHero = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await getHeroByIdDB(id);
    if (!existing) return res.status(404).json({ error: "Hero no encontrado" });

    ["imagen_light", "imagen_dark", "logo_light", "logo_dark"].forEach((f) => {
      deleteFile(existing[f]);
    });

    await deleteHeroDB(id);

    res.json({ message: "Hero eliminado correctamente" });
  } catch (err) {
    console.error("Error en deleteHero:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// PATCH toggle texto
export const toggleHeroTexto = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await toggleHeroTextoDB(id);
    res.json(updated);
  } catch (err) {
    console.error("Error en toggleHeroTexto:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
};
