export interface MatchPlay {
  date: string,
  is_local: boolean,
  hour_start: string,
  id_football_pitch: number,
  football_pitch?: string,
  id_category: number,
  category?: string,
  id_team_opposing: number,
  team_opposing?: string,
  id_team: number,
  team?: string
}
