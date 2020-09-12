import {BaseModel} from './base.model';

export class SessionType {
  //
  // properties
  //
  type = '';
  danceStyles = [];
}

export class EventSession {
  //
  // properties
  //
  startAt = '';
  types = [];
}

export class Event extends BaseModel {
  //
  // properties
  //
  sessions = [];
}
