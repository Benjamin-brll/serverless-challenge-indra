export interface MedicalCenterRepository {
  findByCountryISO(countryISO: string): Promise<any>;
}