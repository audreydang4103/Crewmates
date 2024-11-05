import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CreateCrewmate = ({ setView }) => {
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [color, setColor] = useState('');

    const handleCreate = async () => {
        const { data, error } = await supabase.from('crewmates').insert([{ name, speed: parseInt(speed), color }]);
        if (error) {
            console.error('Error creating crewmate:', error);
        } else {
            alert('Crewmate created successfully!');
            setView('gallery');
        }
    };

    return (
        <div className="form-container">
            <h2>Create a New Crewmate</h2>
            <div className="form-box">
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="Enter crewmate's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <p></p>
            <div className="form-box">
                <label>Speed (mph):</label>
                <input
                    type="number"
                    placeholder="Enter speed in mph"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                />
            </div>
            <p></p>
            <div className="form-box">
                <label>Color:</label>
                <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    <option value="">-- Select Color --</option>
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
            <p></p>
            <button className="submit-button" onClick={handleCreate}>Create Crewmate</button>
        </div>
    );
};

export default CreateCrewmate;
