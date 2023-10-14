export type addressType = {
  street: string
  suite: string
  city: string
  zipcode: number
  geo: {
    lat: string
    lng: string
  }
}

export type companyType = {
  name: string
  catchPhrase: string
  bs: string
}

export type userType = {
  id: number
  name: string
  username: string
  email: string
  address: addressType
  phone: string
  website: string
  company: companyType
}
