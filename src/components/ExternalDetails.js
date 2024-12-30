import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navbar from './global-components/navbar';
import ProductSlider from './shop-components/product-slider-v1';
import ExternalDetailsComponent from './shop-components/ExternalDetailsComponent';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const ExternalDetails = () => {
  const { id } = useParams();
  const [externalProject, setExternalProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExternalProject = async () => {
      try {
        setLoading(true);
        const projectDoc = doc(db, 'externalProjects', id);
        const projectSnap = await getDoc(projectDoc);

        if (projectSnap.exists()) {
          setExternalProject({ id: projectSnap.id, ...projectSnap.data() });
        } else {
          setError('No such external project found!');
        }
      } catch (err) {
        setError('Error fetching external project details.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExternalProject();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <ProductSlider images={externalProject.images || []} />
      <ExternalDetailsComponent property={externalProject} />
      <CallToActionV1 />
      <Footer />
    </div>
  );
};

export default ExternalDetails;
