import { ImageItem } from 'components/ImageGalleryItem/ImageGaleryItem';

import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryList>
      <ImageItem images={images} openModal={openModal} />
    </GalleryList>
  );
};
