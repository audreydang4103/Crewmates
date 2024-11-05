import React from 'react';
import { supabase } from '../supabaseClient';

const DeleteCrewmate = ({ crewmateId, onDeleted }) => {
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('crewmates')
            .delete()
            .eq('id', crewmateId);

        if (error) {
            console.error('Error deleting crewmate:', error);
        } else {
            alert('Crewmate deleted successfully!');
            onDeleted();
        }
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Delete Crewmate
        </button>
    );
};

export default DeleteCrewmate;
