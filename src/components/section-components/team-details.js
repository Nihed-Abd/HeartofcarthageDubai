import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const TeamDetails = () => {
    const { id: projectOwnerId } = useParams(); // Extract projectOwnerId from the route
    const [projectOwner, setProjectOwner] = useState(null);
    const [externalProjects, setExternalProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectOwnerAndProjects = async () => {
            setLoading(true);
            try {
                // Fetch project owner details
                const ownerRef = doc(db, 'projectOwners', projectOwnerId);
                const ownerSnap = await getDoc(ownerRef);
                if (ownerSnap.exists()) {
                    setProjectOwner({ id: ownerSnap.id, ...ownerSnap.data() });
                } else {
                    console.error('No project owner found with the given ID.');
                    setLoading(false);
                    return;
                }
    
                // Use Firestore reference to match the `projectOwner` field
                const projectsQuery = query(
                    collection(db, 'externalProjects'),
                    where('projectOwner', '==', ownerRef) // Use Firestore reference
                );
    
                const projectsSnapshot = await getDocs(projectsQuery);
    
                if (!projectsSnapshot.empty) {
                    const fetchedProjects = projectsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setExternalProjects(fetchedProjects);
                    console.log('Fetched External Projects:', fetchedProjects);
                } else {
                    console.warn('No external projects found for the given project owner.');
                }
            } catch (error) {
                console.error('Error fetching project owner or external projects:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProjectOwnerAndProjects();
    }, [projectOwnerId]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ltn__team-details-area mb-120">
            <div className="container">
                <div className="row">
                    {/* Project Owner Details */}
                    <div className="col-lg-4">
                        {projectOwner && (
                            <div className="ltn__team-details-member-info text-center mb-40">
                                <div className="team-details-img">
                                    <img
                                        src={projectOwner.logo || `${process.env.PUBLIC_URL}/assets/img/team/default.jpg`}
                                        alt="Project Owner"
                                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                    />
                                </div>
                                <h2>{projectOwner.name}</h2>
                                <h6 className="text-uppercase ltn__secondary-color">Developer</h6>
                            </div>
                        )}
                    </div>

                    {/* Associated External Projects */}
                    <div className="col-lg-8">
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="liton_product_grid">
                                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                                    <div className="row">
                                        {externalProjects.map((project) => (
                                            <div key={project.id} className="col-lg-4 col-sm-6 col-12">
                                                <div
                                                    className="ltn__product-item ltn__product-item-4 ltn__product-item-5"
                                                    style={{
                                                        padding: '15px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                    }}
                                                >
                                                    <div
                                                        className="product-img"
                                                        style={{
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            marginBottom: '10px',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <Link to={`/ExternalDetails/${project.id}`}>
                                                            <img
                                                                src={project.images[0]}
                                                                alt={project.title}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '250px',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </Link>
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: '10px',
                                                                left: '10px',
                                                                backgroundColor: '#ff5a3c',
                                                                color: '#fff',
                                                                padding: '5px 10px',
                                                                borderRadius: '5px',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {project.status}
                                                        </div>
                                                    </div>
                                                    <h2
                                                        className="product-title"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <Link to={`/ExternalDetails/${project.id}`}>
                                                            {project.title}
                                                        </Link>
                                                    </h2>
                                                    <div
                                                        className="product-img-location"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <ul>
                                                            <li>
                                                                <i
                                                                    className="flaticon-pin"
                                                                    style={{ color: '#ff5a3c' }}
                                                                />{' '}
                                                                {project.address}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <ul
                                                        className="ltn__list-item-2--- ltn__plot-brief"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <li>
                                                            <i
                                                                className="fas fa-bed"
                                                                style={{ color: '#ff5a3c', marginRight: '5px' }}
                                                            ></i>
                                                            <span>{project.nbrBedRooms}</span> Bedrooms
                                                        </li>
                                                        <li>
                                                            <i
                                                                className="fas fa-bath"
                                                                style={{ color: '#ff5a3c', marginRight: '5px' }}
                                                            ></i>
                                                            <span>{project.nbrBathroom}</span> Bathrooms
                                                        </li>
                                                    </ul>
                                                    <ul
                                                        className="ltn__list-item-2--- ltn__plot-brief"
                                                        style={{
                                                            textAlign: 'left',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <li>
                                                            <i
                                                                className="fas fa-ruler-combined"
                                                                style={{ color: '#ff5a3c', marginRight: '5px' }}
                                                            ></i>
                                                            <span>{project.espace}</span> square Ft
                                                        </li>
                                                    </ul>
                                                    <div
                                                        className="product-info-bottom"
                                                        style={{
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        <i
                                                            className="fas fa-tag"
                                                            style={{ color: '#ff5a3c', marginRight: '5px' }}
                                                        ></i>
                                                        <span>{project.price} AED</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {externalProjects.length === 0 && <p>No external projects found for this project owner.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDetails;
