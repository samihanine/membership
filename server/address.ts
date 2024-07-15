"use server";

import axios from "axios";
import type { Address } from "@prisma/client";
import prisma from "../lib/prisma";
import type { Prisma } from "@prisma/client";

export async function autocompleteAddress(query: string): Promise<Address[]> {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const lyon = "45.7578137,4.8320114";
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query,
  )}&lang=fr&limit=5&format=json&apiKey=${apiKey}&bias=proximity:${lyon}&filter=countrycode:fr`;

  try {
    const response = await axios.get(url);
    return response.data.results.map(
      (result: any): Partial<Address> => ({
        streetNumber: result.housenumber,
        streetName: result.street,
        city: result.city,
        region: result.region,
        postalCode: result.postcode,
        country: result.country,
        latitude: result.lat,
        longitude: result.lon,
        formattedAddress: result.formatted || result.name,
      }),
    );
  } catch (error) {
    console.error("Error fetching autocomplete addresses:", error);
    return [];
  }
}

export async function createAddress(address: Prisma.AddressCreateInput) {
  return await prisma.address.create({
    data: address,
  });
}
