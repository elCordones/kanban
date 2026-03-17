/**
 * Projecte Kanban Alumnes
 * Author: David Cordones
 * Year: 2025
 * License: AGPL v3
 */
export type Language = 'ca' | 'es' | 'gl' | 'eu' | 'en';

export interface Translations {
  title: string;
  newTask: string;
  add: string;
  todo: string;
  inprogress: string;
  review: string;
  done: string;
  deleteConfirm: string;
  export: string;
  import: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  themeAuto: string;
  language: string;
  copyright: string;
  codeLicense: string;
  contentLicense: string;
}

export const translations: Record<Language, Translations> = {
  ca: {
    title: 'Projecte dels Alumnes',
    newTask: 'Nova tasca...',
    add: 'Afegir',
    todo: 'Per fer',
    inprogress: 'En procés',
    review: 'En revisió',
    done: 'Acabat',
    deleteConfirm: 'Segur que vols eliminar aquesta tasca?',
    export: 'Exportar dades',
    import: 'Importar dades',
    theme: 'Tema',
    themeLight: 'Clar',
    themeDark: 'Fosc',
    themeAuto: 'Automàtic',
    language: 'Idioma',
    copyright: '© David Cordones',
    codeLicense: 'Llicència del codi: AGPL v3',
    contentLicense: 'Contingut: CC BY-SA 4.0',
  },
  es: {
    title: 'Proyecto de los Alumnos',
    newTask: 'Nueva tarea...',
    add: 'Añadir',
    todo: 'Por hacer',
    inprogress: 'En proceso',
    review: 'En revisión',
    done: 'Terminado',
    deleteConfirm: '¿Seguro que quieres eliminar esta tarea?',
    export: 'Exportar datos',
    import: 'Importar datos',
    theme: 'Tema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    themeAuto: 'Automático',
    language: 'Idioma',
    copyright: '© David Cordones',
    codeLicense: 'Licencia del código: AGPL v3',
    contentLicense: 'Contenido: CC BY-SA 4.0',
  },
  gl: {
    title: 'Proxecto dos Alumnos',
    newTask: 'Nova tarefa...',
    add: 'Engadir',
    todo: 'Por facer',
    inprogress: 'En proceso',
    review: 'En revisión',
    done: 'Rematado',
    deleteConfirm: 'Seguro que queres eliminar esta tarefa?',
    export: 'Exportar datos',
    import: 'Importar datos',
    theme: 'Tema',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    themeAuto: 'Automático',
    language: 'Idioma',
    copyright: '© David Cordones',
    codeLicense: 'Licenza do código: AGPL v3',
    contentLicense: 'Contido: CC BY-SA 4.0',
  },
  eu: {
    title: 'Ikasleen Proiektua',
    newTask: 'Zeregin berria...',
    add: 'Gehitu',
    todo: 'Egiteko',
    inprogress: 'Prozesuan',
    review: 'Berrikusteko',
    done: 'Amaituta',
    deleteConfirm: 'Ziur zaude zeregin hau ezabatu nahi duzula?',
    export: 'Datuak esportatu',
    import: 'Datuak inportatu',
    theme: 'Gaia',
    themeLight: 'Argia',
    themeDark: 'Iluna',
    themeAuto: 'Automatikoa',
    language: 'Hizkuntza',
    copyright: '© David Cordones',
    codeLicense: 'Kodearen lizentzia: AGPL v3',
    contentLicense: 'Edukia: CC BY-SA 4.0',
  },
  en: {
    title: 'Students Project',
    newTask: 'New task...',
    add: 'Add',
    todo: 'To do',
    inprogress: 'In progress',
    review: 'In review',
    done: 'Done',
    deleteConfirm: 'Are you sure you want to delete this task?',
    export: 'Export data',
    import: 'Import data',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeAuto: 'Automatic',
    language: 'Language',
    copyright: '© David Cordones',
    codeLicense: 'Code License: AGPL v3',
    contentLicense: 'Content: CC BY-SA 4.0',
  }
};
