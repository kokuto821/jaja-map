import { useEffect, useRef, useMemo } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { LineString, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import { Map } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';

function useMovingPoint(map: Map) {
  const animationRef = useRef<number | null>(null);

  const movingPointLayer = useMemo(() => {
    const lineGeoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [140.67, 39.71],
          [140.65, 39.71]
        ]
      },
      properties: {}
    };

    const format = new GeoJSON();
    const lineFeature = format.readFeature(lineGeoJSON, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    const pointFeature = new Feature({
      geometry: new Point(fromLonLat([140.67, 39.71]))
    });

    const vectorSource = new VectorSource({
      features: [...(Array.isArray(lineFeature) ? lineFeature : [lineFeature]), pointFeature]
    });

    return new VectorLayer({
      source: vectorSource,
      zIndex: 9999,
      style: (feature) => {
        if (feature.getGeometry() instanceof LineString) {
          return new Style({
            stroke: new Stroke({ color: 'blue', width: 2 })
          });
        } else {
          return new Style({
            image: new Circle({
              radius: 5,
              fill: new Fill({ color: 'red' })
            })
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    map.addLayer(movingPointLayer);

    const animate = (elapsed: number) => {
      const fraction = (elapsed % 5000) / 5000;
      const lineFeature = movingPointLayer.getSource()?.getFeatures()[0];
      const pointFeature = movingPointLayer.getSource()?.getFeatures()[1];
      
      if (lineFeature && pointFeature) {
        const lineGeometry = lineFeature.getGeometry();
        const pointGeometry = pointFeature.getGeometry();
        
        if (lineGeometry instanceof LineString && pointGeometry instanceof Point) {
          const currentCoordinate = lineGeometry.getCoordinateAt(fraction);
          pointGeometry.setCoordinates(currentCoordinate);
        }
      }

      map.render();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      map.removeLayer(movingPointLayer);
    };
  }, [map, movingPointLayer]);

  return { movingPointLayer };
}

export default useMovingPoint;
