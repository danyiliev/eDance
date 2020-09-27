export const LESSON_TYPES = [
  {value: 'private', name: 'Private'},
  {value: 'group', name: 'Group'},
];

export const OCCASIONS = [
  {value: 'wedding', name: 'Wedding Preparation'},
  {value: 'event', name: 'Special Event'},
];

export const SELECT_AGE = 'age';
export const SELECT_DANCE_LEVEL = 'dance-level';
export const SELECT_AMERICAN_BALLROOM = 'american-ballroom';
export const SELECT_AMERICAN_RHYTHM = 'american-rhythm';
export const SELECT_STANDARD = 'standard';
export const SELECT_LATIN = 'latin';

export const AGE_GROUPS = [
  {value: 'J-1', name: 'J-1 (up to 5)'},
  {value: 'J-2', name: 'J-2 (6-8)'},
  {value: 'J-3', name: 'J-3 (9-11)'},
  {value: 'J-4', name: 'J-4 (12-13)'},
  {value: 'J-5', name: 'J-5 (14-15)'},
  {value: 'J-6', name: 'J-6 (16-18)'},
  {value: 'A1', name: 'A1 (21-30)'},
  {value: 'A2', name: 'A2 (31-40)'},
  {value: 'A3', name: 'A3 (41-50)'},
  {value: 'B1', name: 'B1 (51-60)'},
  {value: 'B2', name: 'B2 (61-70)'},
  {value: 'C1', name: 'C1 (71-80)'},
  {value: 'C2', name: 'C2 (81 & up)'},
];

export const STYLE_AMERICAN_BALLROOM = [
  {value: 'W', name: 'Waltz'},
  {value: 'T', name: 'Tango'},
  {value: 'FT', name: 'Foxtrot'},
  {value: 'VW', name: 'Viennese waltz'},
  {value: 'PB', name: 'Peabody'},
];

export const STYLE_AMERICAN_RHYTHM = [
  {value: 'CC', name: 'Chachacha'},
  {value: 'R', name: 'Rumba'},
  {value: 'SW', name: 'Swing'},
  {value: 'B', name: 'Bolero'},
  {value: 'M', name: 'Mambo'},
  {value: 'Mer', name: 'Merengue'},
  {value: 'Sam', name: 'Samba'},
  {value: 'PD', name: 'Paso Doble'},
  {value: 'Hus', name: 'Hustle'},
  {value: 'WSC', name: 'West Coast Swing'},
];

export const STYLE_INTERNATIONAL_STANDARD = [
  {value: 'W', name: 'Waltz'},
  {value: 'T', name: 'Tango'},
  {value: 'VW', name: 'Viennese Waltz'},
  {value: 'FT', name: 'Foxtrot'},
  {value: 'QS', name: 'Quick Step'},
];

export const STYLE_INTERNATIONAL_LATIN = [
  {value: 'CC', name: 'Chachacha'},
  {value: 'Sam', name: 'Samba'},
  {value: 'R', name: 'Rumba'},
  {value: 'PD', name: 'Paso Doble'},
  {value: 'J', name: 'Jive'},
];

export const DANCE_LEVELS = {
  CLOSED_NEWCOMER: 'closed-newcomer',
  CLOSED_BRONZE: ['closed-bronze1', 'closed-bronze2', 'closed-bronze3'],
  CLOSED_SILVER: ['closed-silver1', 'closed-silver2', 'closed-silver3'],
  CLOSED_GOLD: ['closed-gold1', 'closed-gold2', 'closed-gold3'],
  CLOSED_GOLD_ADVANCED: 'closed-advanced',
  OPEN_PREBRONZE: 'open-prebronze',
  OPEN_BRONZE: 'open-bronze',
  OPEN_PRESILVER: 'open-presilver',
  OPEN_SILVER: 'open-silver',
  OPEN_GOLD: 'open-gold',
  OPEN_GOLD_ADVANCED: 'open-gold-advanced',
};

export const DURATIONS_LESSON = [30, 45, 60];
export const DURATIONS_REST = [5, 10, 15];

export const PRIZE_OPTIONS = {
  TOP_STUDIO_SINGLE: 'top-studio-single',
  TOP_STUDIO_MULTI: 'top-studio-multi',
  TOP_TEACHER_PROAM: 'top-teacher-proam',
  SINGLE_ENTRIES: 'single-entries',
  MULTI_ENTRIES: 'multi-entries',
  PRE_TEEN: 'pre-teens',
  PROFESSIONAL: 'professional',
  PROAM_AMATEUR: 'proam-amateur',
  SOLO: 'solo',
  PROAM_SCHOLAR_CLOSED: 'proam-scholars-closed',
  PROAM_SCHOLAR_OPEN: 'proam-scholars-open',
};
