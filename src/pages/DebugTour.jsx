import React from "react";
import { useParams } from "react-router-dom";

export default function DebugTour() {
    const params = useParams();
    
    return (
        <div style={{ padding: '50px', background: '#f0f0f0', minHeight: '100vh' }}>
            <h1>Debug Tour Page</h1>
            <h2>URL Parameters:</h2>
            <pre style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                {JSON.stringify(params, null, 2)}
            </pre>
            
            <h2>Current URL:</h2>
            <p>{window.location.href}</p>
            
            <h2>All available params:</h2>
            <ul>
                <li>lang: {params.lang}</li>
                <li>slug: {params.slug}</li>
                <li>All params: {Object.keys(params).join(', ')}</li>
            </ul>
        </div>
    );
}