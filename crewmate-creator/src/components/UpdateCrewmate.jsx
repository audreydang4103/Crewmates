import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const UpdateCrewmate = ({ crewmateId, setView }) => {
    const [crewmate, setCrewmate] = useState(null);
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase.from('crewmates').select('*').eq('id', crewmateId).single();
            if (error) {
                console.error('Error fetching crewmate:', error);
            } else {
                setCrewmate(data);
                setName(data.name);
                setSpeed(data.speed);
                setColor(data.color);
            }
        };
        fetchCrewmate();
    }, [crewmateId]);

    const handleUpdate = async () => {
        const { data, error } = await supabase.from('crewmates').update({ name, speed: parseInt(speed), color }).eq('id', crewmateId);
        if (error) {
            console.error('Error updating crewmate:', error);
        } else {
            alert('Crewmate updated successfully!');
            setView('details');
        }
    };

    return (
        <div>
            {crewmate ? (
                <div>
                    <h2>Update Your Crewmate</h2>
                    <div className="input-container">
                        <label htmlFor="name-input" className="input-label">Name:</label>
                        <input
                            type="text"
                            id="name-input"
                            placeholder="Enter crewmate's name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="speed-input" className="input-label">Speed:</label>
                        <input
                            type="number"
                            id="speed-input"
                            placeholder="Enter speed in mph"
                            value={speed}
                            onChange={(e) => setSpeed(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="color-select" className="input-label">Color:</label>
                        <select
                            id="color-select"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="Red">Red</option>
                            <option value="Green">Green</option>
                            <option value="Blue">Blue</option>
                            <option value="Purple">Purple</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Orange">Orange</option>
                            <option value="Pink">Pink</option>
                            <option value="Rainbow">Rainbow</option>
                        </select>
                    </div>

                    <button onClick={handleUpdate}>Update Crewmate</button>
                    <button onClick={() => setView('details')}>Cancel</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateCrewmate;
