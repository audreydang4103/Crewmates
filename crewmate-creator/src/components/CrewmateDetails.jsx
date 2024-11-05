import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CrewmateDetails = ({ crewmateId, setView }) => {
    const [crewmate, setCrewmate] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', crewmateId)
                .single();
            if (error) {
                console.error('Error fetching crewmate:', error);
                setError(true);
            } else {
                setCrewmate(data);
            }
        };
        fetchCrewmate();
    }, [crewmateId]);

    const handleDelete = async () => {
        const { error } = await supabase
            .from('crewmates')
            .delete()
            .eq('id', crewmateId);

        if (error) {
            console.error('Error deleting crewmate:', error);
        } else {
            alert('Crewmate deleted successfully!');
            setView('gallery');
        }
    };

    if (error) {
        return <p>Crewmate not found or an error occurred.</p>;
    }

    return (
        <div>
            {crewmate ? (
                <div className="details-box">
                    <h2>Crewmate: {crewmate.name}</h2>
                    <p className="details-text">Color: {crewmate.color}</p>
                    <p className="details-text">Speed: {crewmate.speed} mph</p>
                    <div className="action-buttons">
                        <button onClick={() => setView('update')}>Update Crewmate</button>
                        <button onClick={handleDelete}>Delete Crewmate</button>
                        <button onClick={() => setView('gallery')}>Back to Gallery</button>
                    </div>
                </div>

            ) : (
                <p>Loading crewmate details...</p>
            )}
        </div>
    );
};

export default CrewmateDetails;
