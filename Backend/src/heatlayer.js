import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import axios from "axios";

export default function HeatmapLayer() {
    const map = useMap();

    useEffect(() => {
        axios.get("http://localhost:5000/api/heatmap/risk")
            .then(res => {
                const heatData = res.data.map(p => [
                    p.lat,
                    p.lng,
                    p.value || 1
                ]);

                L.heatLayer(heatData, {
                    radius: 25,
                    blur: 15,
                    maxZoom: 12,
                }).addTo(map);
            })
            .catch(err => console.error(err));
    }, [map]);

    return null;
}