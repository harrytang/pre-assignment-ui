/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

export default interface IApartment {
    _id?: string,
    address: string,
    postalCode: string,
    postalArea: string,
    rooms: string,
    squareMeters: number,
    buildYear: number,
    hasElevator?: boolean,
    price: number,
    notes?: string,
    createdAt?: string
    updatedAt?: string
}