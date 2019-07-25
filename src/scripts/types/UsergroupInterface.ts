export default interface UsergroupInterface {
  id: number;
  singularTitle?: string;
  pluralTitle: string;

  color?: string;
  icon?: string;
  
  isStaff?: number;
}