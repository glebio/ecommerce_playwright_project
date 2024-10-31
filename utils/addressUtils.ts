import {faker} from '@faker-js/faker';

export interface AddressData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    region: string;
}

export function generateAddressData(): AddressData {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `user${faker.string.numeric(5)}@qaresults.com`,
        phone: faker.phone.number(),
        address: `${faker.location.streetAddress()}`,
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        country: 'United States',
        region: 'New York'
    };
}
