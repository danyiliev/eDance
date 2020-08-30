import {
  AGE_GROUPS,
  DANCE_LEVELS,
  LESSON_TYPES,
  SELECT_AMERICAN_BALLROOM,
  SELECT_AMERICAN_RHYTHM,
  SELECT_LATIN,
  SELECT_STANDARD,
  STYLE_AMERICAN_BALLROOM,
  STYLE_AMERICAN_RHYTHM,
  STYLE_INTERNATIONAL_LATIN,
  STYLE_INTERNATIONAL_STANDARD,
} from '../constants/dance-data';

export class DanceHelper {
  static danceLevelsAll() {
    return [
      {value: DANCE_LEVELS.CLOSED_NEWCOMER, name: 'Newcomer Closed'},
      {value: DANCE_LEVELS.CLOSED_BRONZE[0], name: 'Bronze 1 Closed'},
      {value: DANCE_LEVELS.CLOSED_BRONZE[1], name: 'Bronze 2 Closed'},
      {value: DANCE_LEVELS.CLOSED_BRONZE[2], name: 'Bronze 3 Closed'},
      {value: DANCE_LEVELS.CLOSED_SILVER[0], name: 'Silver 1 Closed'},
      {value: DANCE_LEVELS.CLOSED_SILVER[1], name: 'Silver 2 Closed'},
      {value: DANCE_LEVELS.CLOSED_SILVER[2], name: 'Silver 3 Closed'},
      {value: DANCE_LEVELS.CLOSED_GOLD[0], name: 'Gold 1 Closed'},
      {value: DANCE_LEVELS.CLOSED_GOLD[1], name: 'Gold 2 Closed'},
      {value: DANCE_LEVELS.CLOSED_GOLD[2], name: 'Gold 3 Closed'},
      {value: DANCE_LEVELS.CLOSED_GOLD_ADVANCED, name: 'Gold Advanced'},

      {value: DANCE_LEVELS.OPEN_PREBRONZE, name: 'Open Pre-Bronze'},
      {value: DANCE_LEVELS.OPEN_BRONZE, name: 'Open Bronze'},
      {value: DANCE_LEVELS.OPEN_PRESILVER, name: 'Open Pre-Silver'},
      {value: DANCE_LEVELS.OPEN_SILVER, name: 'Open Silver'},
      {value: DANCE_LEVELS.OPEN_GOLD, name: 'Open Gold'},
      {value: DANCE_LEVELS.OPEN_GOLD_ADVANCED, name: 'Open Gold Advanced'},
    ];
  }

  static danceStylesAll() {
    return [
      {value: SELECT_AMERICAN_BALLROOM, name: 'American Ballroom'},
      {value: SELECT_AMERICAN_RHYTHM, name: 'American Rhythm'},
      {value: SELECT_STANDARD, name: 'Standard'},
      {value: SELECT_LATIN, name: 'Latin'},
    ];
  }

  static dancesByStyle(style) {
    if (style === SELECT_AMERICAN_BALLROOM) {
      return STYLE_AMERICAN_BALLROOM;
    } else if (style === SELECT_AMERICAN_RHYTHM) {
      return STYLE_AMERICAN_RHYTHM;
    } else if (style === SELECT_STANDARD) {
      return STYLE_INTERNATIONAL_STANDARD;
    } else {
      return STYLE_INTERNATIONAL_LATIN;
    }
  }

  static danceStyleNameByVal(val) {
    const style = this.danceStylesAll().find((s) => s.value === val);
    return style ? style.name : '';
  }

  static danceNameByVal(val, style) {
    const dances = this.dancesByStyle(style);
    const dance = dances.find((d) => d.value === val);
    return dance ? dance.name : '';
  }

  static danceLevelNameByVal(val) {
    const level = this.danceLevelsAll().find((l) => l.value === val);
    return level ? level.name : '';
  }

  static lessonTypeNameByVal(val) {
    const type = LESSON_TYPES.find((t) => t.value === val);
    return type ? type.name : '';
  }

  static ageGroupNameByVal(val) {
    const age = AGE_GROUPS.find((t) => t.value === val);
    return age ? age.name : '';
  }
}
