export default interface ICreateProfileDTO {
  user_id: string;
  nickname?: string;
  birthdate: Date;
  phone?: string;
  blood_type?: string;
  bio?: string;
}
