// src/components/Admin/CategoryPhotosEditor/index.jsx
import {
  ActionsOverlay,
  Button,
  CoverPanel,
  CoverPhoto,
  Dropdown,
  EditorLayout,
  MainArea,
  PhotoCard,
  PhotosGrid,
  Wrapper
} from "./styles";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";

import api from "../../../../services/api";
import { getImageUrl } from "../../../../utils/getImageUrl"; // <-- IMPORTA LA FUNCIÓN
import { useParams } from "react-router-dom";

function CategoryPhotosEditor() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);

  /* ================= FETCH ================= */

  const fetchEditorData = async () => {
    const res = await api.get(
      `/gallery/categories/${categoryId}/editor`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setCategory(res.data.category);
    setPhotos(res.data.photos);
  };

  const fetchCategories = async () => {
    const res = await api.get("/gallery/categories");
    setCategories(res.data.filter(c => c.id !== parseInt(categoryId)));
  };

  useEffect(() => {
    fetchEditorData();
    fetchCategories();
  }, [categoryId]);

  /* ================= ACTIONS ================= */

  const makeCover = async (photoId) => {
    await api.patch(
      `/gallery/categories/${categoryId}/cover`,
      { photoId },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchEditorData();
  };

  const toggleActive = async (photoId) => {
    await api.patch(
      `/gallery/photos/${photoId}/toggle`,
      null,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchEditorData();
  };

  const deletePhoto = async (photoId) => {
    if (!window.confirm("¿Eliminar esta foto?")) return;
    await api.delete(`/gallery/photos/${photoId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchEditorData();
  };

  const assignToOtherCategory = async (photoId, targetCategoryId) => {
    await api.post(
      `/gallery/categories/${targetCategoryId}/photos`,
      { photoId, display_order: 0 },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchEditorData();
  };

  /* ================= DRAG ================= */

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setPhotos(items);

    const orders = items.map((p, index) => ({
      photoId: p.id,
      display_order: index,
    }));

    await api.patch(
      `/gallery/categories/${categoryId}/photos/order`,
      { orders },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  };

  if (!category) return <p>Cargando…</p>;

  return (
    <Wrapper>
      <EditorLayout>
        <h2>{category.name}</h2>

        <MainArea>
          {/* -------- COVER -------- */}
          <CoverPanel>
            <h4>Portada</h4>
            {category.cover_photo_id ? (
              <CoverPhoto
                src={getImageUrl(
                  photos.find(p => p.id === category.cover_photo_id)?.image_url
                )}
              />
            ) : (
              <p>No hay portada seleccionada</p>
            )}
          </CoverPanel>

          {/* -------- PHOTOS -------- */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <PhotosGrid ref={provided.innerRef} {...provided.droppableProps}>
                  {photos.map((photo, index) => (
                    <Draggable
                      key={photo.id}
                      draggableId={photo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <PhotoCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isCover={photo.id === category.cover_photo_id}
                        >
                          <img
                            src={getImageUrl(photo.image_url)}
                            alt=""
                          />

                          <ActionsOverlay className="actions">
                            <Button onClick={() => makeCover(photo.id)}>
                              Hacer portada
                            </Button>

                            <Button
                              variant="toggle"
                              onClick={() => toggleActive(photo.id)}
                            >
                              {photo.is_active ? "Desactivar" : "Activar"}
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => deletePhoto(photo.id)}
                            >
                              Eliminar
                            </Button>

                            <Dropdown
                              defaultValue=""
                              onChange={(e) =>
                                assignToOtherCategory(
                                  photo.id,
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              <option value="" disabled>
                                Asignar a otra categoría
                              </option>
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                            </Dropdown>
                          </ActionsOverlay>
                        </PhotoCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </PhotosGrid>
              )}
            </Droppable>
          </DragDropContext>
        </MainArea>
      </EditorLayout>
    </Wrapper>
  );
}

export default CategoryPhotosEditor;
