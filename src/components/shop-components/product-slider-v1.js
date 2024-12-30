import React from 'react';

const ProductSliderV1 = ({ images }) => {
  const imageStyle = {
    width: '100%',
    height: '300px', // Adjust the height as needed
    objectFit: 'cover', // Ensures the image fits within the dimensions while maintaining aspect ratio
  };

  return (
    <div className="ltn__img-slider-area mb-90">
      <div className="container-fluid">
        <div className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div className="col-lg-12" key={index}>
                <div className="ltn__img-slide-item-4">
                  <a href={image} data-rel="lightcase:myCollection">
                    <img
                      src={image}
                      alt={`Property Image ${index + 1}`}
                      style={imageStyle}
                    />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No images available for this property.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSliderV1;
