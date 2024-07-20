"use server";

import axios from "axios";
import { z } from "zod";

export const addressSchema = z.object({
  unit: z.string().optional(),
  formattedAddress: z.string(),
  streetNumber: z.string().optional(),
  streetName: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  countryCode: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Address = z.infer<typeof addressSchema>;

export async function autocompleteAddress(query: string): Promise<Address[]> {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const lyon = "45.7578137,4.8320114";
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query,
  )}&lang=fr&limit=5&format=json&apiKey=${apiKey}&bias=proximity:${lyon}&filter=countryCodecode:fr`;

  try {
    const response = await axios.get(url);
    return response.data.results.map(
      (result: any): Partial<Address> => ({
        streetNumber: result.housenumber,
        streetName: result.street,
        city: result.city,
        region: result.region,
        postalCode: result.postcode,
        countryCode: result.countryCode,
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
