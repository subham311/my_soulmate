

export interface user_basic_info {
    name(name: any, arg1: string): unknown
    user_id: number
    id: number
    profile_id: string
    dob: string
    dob_date: string
    dob_time: string
    email_id: string
    phone_no: number
    marital_status: string
    height: string
    weight: string
    family_status: string
    family_values: string
    family_type: string
    disability_flag: string
    body_type: string
    drinking_habbits: string
    age: string
    gender: string
    eating_habbits: string
    smoking_habbits: string
    no_sister: string
    no_brother: string
    father_occupation: string
    mother_occupation: string
    family_location: string
    about_my_family: string
    u_name: string
    ac_for: string
    mother_tong_id: string
    mother_tong: string
    about_us: string
    caste_name: string
    caste_id: number
    religion: string
    oth_comm_marry_flag: string
    jotok_rasi_id: number
    kundali_file_name: string
    beng_rashi: string
    file_path: string
    rasi_id: number
    city_name: string
    city_id: number
    country_id: any
    country_name: string
    state_id: any
    state_name: string
    kyc_flag: string,
    location_id: string,
    latt_long:string
    profile_verify_flag:string
  }
  


  export interface user_groom_loc {
    id: number
    user_id: number
    heigh_education: any
    emp_type: string
    occup: any
    income: string
    work_location: any
    // state: string
    // city: string
    ancis_org: any
    // country: string
    citizen: string
    edu_in_dtls: string
    collage: string
    occup_in_dtls: string
    org_name: string
    created_by: string
    created_dt: string
    modified_by: string
    modified_dt: string
    education_name: string
    occu_name: string
    income_name: string
  }

  export interface partner_pref {
    id: number
    user_id: number
    age_frm: number
    age_to: number
    marital_status: string
    mother_tounge_id: number
    mother_tounge: string
    religion: string
    location_id: number
    location_name: string
  }


  export interface partOwnLoca_ProfileMatch {
    emp_type: string
    education_name: string
    occu_name: string
  }

  export interface partnerBasicInfo_ProfileMatch {
    dob: string
    marital_status: string
    // gender: string
    height: string
    family_status: string
    family_values: string
    family_type: string
    disability_flag: string
    drinking_habbits: string
    eating_habbits: string
    smoking_habbits: string
    mother_tong: string
    religion: string
    state_name: any
  }

  export interface billingAllHistory {
    pay_name: string,
    tennure_period: number,
    expire_dt: string,
    tnx_date: string,
    order_id: string,
    amount: number
  }
  
  


  
  