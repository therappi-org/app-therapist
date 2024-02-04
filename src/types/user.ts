export type UserData = {
  user: User;
  token: string;
};

export type User = {
  id: number;
  sName: string;
  sShortBio: string;
  sCpf: string;
  sEmail: string;
  sCellphone: string;
  dBirthDate: string;
  sAvatarPath: string;
  userProfiles: [
    {
      id: number;
      sProfileKey: string;
      sStatus: string;
      sRejectedReason: string;
      sDeviceId: string;
    },
    {
      id: number;
      sProfileKey: string;
      sStatus: string;
      sRejectedReason: string;
      sDeviceId: string;
    },
  ];
  sAvatarUrl: string;
};

export type UpdateUserData = {
  userId?: number;
  s_birthdate?: string;
  s_cellphone?: string;
  s_short_bio?: string;
};
