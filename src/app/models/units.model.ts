import { GymUnit } from './gym-unit.model';

export interface Units {
  current_country_id: number;
  locations: GymUnit[];
  wp_total: number;
  total: number;
  success: boolean;
}
