import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CrewmateGallery = ({ setView, setSelectedCrewmateId }) => {
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        const fetchCrewmates = async () => {
            const { data, error } = await supabase.from('crewmates').select('*');
            if (error) {
                console.error('Error fetching crewmates:', error);
            } else {
                setCrewmates(data);
            }
        };
        fetchCrewmates();
    }, []);

    return (
        <div className="container">
            <h2>Your Crewmate Gallery!</h2>
            {crewmates.length > 0 ? (
                crewmates.map((crewmate) => (
                    <div key={crewmate.id} className="crewmate-card">
                        <h3>Name: {crewmate.name}</h3>
                        <p>Speed: {crewmate.speed} mph</p>
                        <p>Color: {crewmate.color || 'N/A'}</p>
                        <button onClick={() => { setSelectedCrewmateId(crewmate.id); setView('details'); }}>
                            View Details
                        </button>
                    </div>
                ))
            ) : (
                <p>You haven't made a crewmate yet!</p>
            )}
        </div>
    );
};

export default CrewmateGallery;
