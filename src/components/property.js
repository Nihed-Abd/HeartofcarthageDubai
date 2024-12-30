import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ProductSlider from './shop-components/product-slider-v1';
import ProductDetails from './shop-components/shop-details';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyDoc = doc(db, 'properties', id);
        const propertySnap = await getDoc(propertyDoc);

        if (propertySnap.exists()) {
          setProperty(propertySnap.data());
        } else {
          console.error('No such property document!');
        }
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    fetchPropertyData();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <ProductSlider images={property.images} />
      <ProductDetails property={property} />
      <CallToActionV1 />
      <Footer />
    </div>
  );
};

export default Property;
