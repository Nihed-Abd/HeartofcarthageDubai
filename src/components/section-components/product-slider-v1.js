import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Ensure Firebase is initialized
import { initializeApp } from "firebase/app"; // Firebase initialization

const firebaseConfig = {
  // Your Firebase configuration object
};

initializeApp(firebaseConfig);
const db = getFirestore();

const ProductSliderV1 = () => {
    const { id } = useParams(); // Get the property id from the route
    const [images, setImages] = useState([]);
    const [propertyData, setPropertyData] = useState(null);
    const publicUrl = process.env.PUBLIC_URL + '/';

    useEffect(() => {
        // Fetch property data from Firebase
        const fetchData = async () => {
            try {
                const docRef = doc(db, "properties", id); // Adjust 'properties' to your collection name
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPropertyData(data);
                    setImages(data.images || []); // Assuming 'images' is an array in your Firebase document
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching property data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!propertyData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title-area ltn__section-title-2--- text-center">
                                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Properties</h6>
                                <h1 className="section-title">Featured Listings</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row ltn__product-slider-item-four-active-full-width slick-arrow-1">
                        {images.map((image, index) => (
                            <div className="col-lg-12" key={index}>
                                <div className="ltn__product-item ltn__product-item-4 text-center---">
                                    <div className="product-img go-top">
                                        <img src={image} alt={`Property Image ${index + 1}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSliderV1;
