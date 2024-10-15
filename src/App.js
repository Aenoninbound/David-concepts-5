import React, { useState, useEffect } from 'react';
import './App.css';

const planets = [
  { name: 'Mercury', color: '#8C7E6A', size: 20 },
  { name: 'Venus', color: '#E6C073', size: 30 },
  { name: 'Earth', color: '#6B93D6', size: 35 },
  { name: 'Mars', color: '#C1440E', size: 25 },
  { name: 'Jupiter', color: '#D8CA9D', size: 60 },
  { name: 'Saturn', color: '#F4D47A', size: 55 },
  { name: 'Uranus', color: '#C9EEFF', size: 45 },
  { name: 'Neptune', color: '#5B5DDF', size: 40 }
];

const FloatingPlanet = ({ name, color, size, x, y, z }) => {
  const style = {
    '--size': `${size}px`,
    '--color': color,
    transform: `translate3d(${x}px, ${y}px, ${z}px)`
  };

  return (
    <div className="planet" style={style}>
      <div className="planet-surface"></div>
      <div className="planet-name">{name}</div>
    </div>
  );
};

function App() {
  const [floatingPlanets, setFloatingPlanets] = useState([]);

  useEffect(() => {
    const newPlanets = planets.map(planet => ({
      ...planet,
      x: Math.random() * window.innerWidth - window.innerWidth / 2,
      y: Math.random() * window.innerHeight - window.innerHeight / 2,
      z: Math.random() * 500 - 250,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      speedZ: (Math.random() - 0.5) * 2
    }));
    setFloatingPlanets(newPlanets);

    const animatePlanets = () => {
      setFloatingPlanets(prevPlanets => prevPlanets.map(planet => {
        let newX = planet.x + planet.speedX;
        let newY = planet.y + planet.speedY;
        let newZ = planet.z + planet.speedZ;

        if (Math.abs(newX) > window.innerWidth / 2) planet.speedX *= -1;
        if (Math.abs(newY) > window.innerHeight / 2) planet.speedY *= -1;
        if (Math.abs(newZ) > 250) planet.speedZ *= -1;

        return { ...planet, x: newX, y: newY, z: newZ };
      }));
    };

    const intervalId = setInterval(animatePlanets, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <div className="space">
        <div className="content">
          <h1>3D Floating Planets</h1>
          <p>Watch the planets float in space!</p>
        </div>
        {floatingPlanets.map((planet, index) => (
          <FloatingPlanet key={index} {...planet} />
        ))}
      </div>
    </div>
  );
}

export default App;

