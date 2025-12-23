import React, { useEffect, useState } from "react";

import api from "../../services/api";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  gap: 20px;
  padding: 20px;
`;

const PhotoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  }
;`

function CategoryPage() {
  const { slug } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get(`/gallery/categories/${slug}/photos`);
        setPhotos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
  }, [slug]);

  return (
    <div>
      <Title>
      <h1>{slug}</h1>
      </Title>
      <PhotosWrapper>
        {photos.map(photo => (
          <PhotoCard key={photo.id}>
            <PhotoImage src={`http://localhost:5000${photo.image_url}`} />
          </PhotoCard>
        ))}
      </PhotosWrapper>
    </div>
  );
}

export default CategoryPage;
