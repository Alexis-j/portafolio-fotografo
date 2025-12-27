import {Button, CoverPhoto, Dropdown, PhotoCard, PhotosGrid, Wrapper} from "./styles"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";

import api from "../../../../services/api";
import { useParams } from "react-router-dom";

// ---------- COMPONENT ----------
function CategoryPhotosEditor() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);



  // ---------- FETCH DATA ----------
  const fetchEditorData = async () => {
  try {
    const res = await api.get(
      `/gallery/categories/${categoryId}/editor`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setCategory(res.data.category);
    setPhotos(res.data.photos);
  } catch (err) {
    console.error(err);
  }
};


  const fetchCategories = async () => {
    try {
      const res = await api.get("/gallery/categories");
      setCategories(res.data.filter(c => c.id !== parseInt(categoryId)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  fetchEditorData();
  fetchCategories();
}, [categoryId]);


  // ---------- ACTIONS ----------
  const makeCover = async (photoId) => {
    try {
      await api.patch(
        `/gallery/categories/${categoryId}/cover`,
        { photoId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchEditorData();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (photoId) => {
    try {
      await api.patch(
        `/gallery/photos/${photoId}/toggle`,
        null,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchEditorData();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePhoto = async (photoId) => {
    if (!window.confirm("¿Eliminar esta foto?")) return;
    try {
      await api.delete(`/gallery/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchEditorData();
    } catch (err) {
      console.error(err);
    }
  };

  const assignToOtherCategory = async (photoId, targetCategoryId) => {
    try {
      await api.post(
        `/gallery/categories/${targetCategoryId}/photos`,
        { photoId, display_order: 0 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchEditorData();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- DRAG & DROP ----------
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setPhotos(items);

    const orders = items.map((p, index) => ({
      photoId: p.id,
      display_order: index
    }));

    try {
      await api.patch(
        `/gallery/categories/${categoryId}/photos/order`,
        { orders },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  if (!category) return <p>Cargando...</p>;

  return (
    <Wrapper>
      <h2>{category.name}</h2>

      {category.cover_photo_id && (
        <CoverPhoto
          src={`http://localhost:5000${photos.find(p => p.id === category.cover_photo_id)?.image_url}`}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="photos" direction="horizontal">
          {(provided) => (
            <PhotosGrid {...provided.droppableProps} ref={provided.innerRef}>
              {photos.map((photo, index) => (
                <Draggable key={photo.id} draggableId={photo.id.toString()} index={index}>
                  {(provided) => (
                    <PhotoCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isCover={photo.id === category.cover_photo_id}
                    >
                      <img src={`http://localhost:5000${photo.image_url}`} alt="" />
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
                        <Button onClick={() => makeCover(photo.id)}>Hacer portada</Button>
                        <Button variant="toggle" onClick={() => toggleActive(photo.id)}>
                          {photo.is_active ? "Desactivar" : "Activar"}
                        </Button>
                        <Button variant="danger" onClick={() => deletePhoto(photo.id)}>Eliminar</Button>
                      </div>

                      <Dropdown onChange={(e) => assignToOtherCategory(photo.id, parseInt(e.target.value))} defaultValue="">
                        <option value="" disabled>Asignar a otra categoría</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </Dropdown>
                    </PhotoCard>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </PhotosGrid>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
}

export default CategoryPhotosEditor;
