// Temas de la Semana 6 de Desarrollo de Software 2 y su relación con el mapa C4 del Delivery System.
export const TEMAS = [
  { id: 't1', n: 1, titulo: 'Introducción a la arquitectura de software', corto: 'Arquitectura', color: '#FF8A3D', min: 12 },
  { id: 't2', n: 2, titulo: 'El modelo de vistas 4+1', corto: 'Vistas 4+1', color: '#C6F33A', min: 23 },
  { id: 't3', n: 3, titulo: 'El modelo C4 para visualizar la arquitectura', corto: 'Modelo C4', color: '#6EA8FF', min: 20 },
  { id: 't4', n: 4, titulo: 'Revisión del diseño orientado a objetos', corto: 'OOD', color: '#7FE3C4', min: 8 },
  { id: 't5', n: 5, titulo: 'Patrones de diseño: Factory, Builder y Observer', corto: 'Patrones', color: '#B78CFF', min: 10 },
];
export const TEMA = Object.fromEntries(TEMAS.map((t) => [t.id, t]));

// Colores por tipo de elemento (los mismos significados que usa Archify).
export const TIPOS = {
  persona: { bg: '#ECEEF2', borde: '#6B7686', nombre: 'Persona' },
  externo: { bg: '#F3F4F6', borde: '#9AA3B2', nombre: 'Sistema externo' },
  sistema: { bg: '#DDF5EA', borde: '#15A26B', nombre: 'Sistema' },
  contenedor: { bg: '#E0F7FA', borde: '#0E9DB0', nombre: 'Contenedor' },
  componente: { bg: '#FFF2D6', borde: '#D9930F', nombre: 'Componente' },
  datos: { bg: '#ECE6FF', borde: '#7C5CE6', nombre: 'Datos' },
  codigo: { bg: '#FDE7F0', borde: '#C2407A', nombre: 'Código' },
};
