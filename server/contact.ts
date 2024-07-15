"use server";

import axios, { AxiosError, AxiosResponse } from "axios";

export const sendContactForm = async (data: {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  message: string;
}): Promise<{ error?: string }> => {
  try {
    const json = {
      submittedAt: Date.now().toString(),
      fields: [
        {
          objectTypeId: "0-1",
          name: "email",
          value: data.email,
        },
        {
          objectTypeId: "0-1",
          name: "firstname",
          value: data.firstName,
        },
        {
          objectTypeId: "0-1",
          name: "lastname",
          value: data.lastName,
        },
        {
          objectTypeId: "0-1",
          name: "company",
          value: data.companyName,
        },
        {
          objectTypeId: "0-1",
          name: "message",
          value: data.message,
        },
      ],
      context: {
        pageUri: "www.printags.fr/contact",
        pageName: "Contact page",
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow Example Company to store and process my personal data.",
          communications: [],
        },
      },
    };

    const hubspotContactFormId = process.env.HUBSPOT_CONTACT_FORM_ID;
    const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotContactFormId}`;

    await axios.post(url, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      error: undefined,
    };
  } catch (error) {
    return { error: (error as AxiosError)?.response?.data as any };
  }
};

export const createContact = async (contact: {
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  website?: string;
  company?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}) => {
  const newContact = {
    properties: [
      { property: "email", value: contact.email },
      { property: "firstname", value: contact.firstName },
      { property: "lastname", value: contact.lastName },
      { property: "website", value: contact.website },
      { property: "company", value: contact.company },
      { property: "phone", value: contact.phone },
      { property: "address", value: contact.address },
      { property: "city", value: contact.city },
      { property: "state", value: contact.state },
      { property: "zip", value: contact.zip },
      { property: "lifecyclestage", value: "customer" },
    ],
  };
  const hubspotAccessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  const url: string = `https://api.hubapi.com/contacts/v1/contact`;
  try {
    const response: AxiosResponse<{
      vid: number;
      "identity-profiles": [
        {
          identities: {
            timestamp: number;
            type: string;
            value: string;
          }[];
          vid: number;
        },
      ];
    }> = await axios.post(url, newContact, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hubspotAccessToken}`,
      },
    });

    return {
      error: undefined,
      data: {
        hubspotId: response.data.vid.toString(),
      },
    };
  } catch (error) {
    console.log("Error creating contact:", error);
    return { error: (error as AxiosError)?.response?.data as string };
  }
};

export const updateContact = async (contact: {
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  website?: string;
  company?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  hubspotId: string;
}) => {
  const updatedContact = {
    properties: [
      { property: "email", value: contact.email },
      { property: "firstname", value: contact.firstName },
      { property: "lastname", value: contact.lastName },
      { property: "website", value: contact.website },
      { property: "company", value: contact.company },
      { property: "phone", value: contact.phone },
      { property: "address", value: contact.address },
      { property: "city", value: contact.city },
      { property: "state", value: contact.state },
      { property: "zip", value: contact.zip },
    ],
  };
  const hubspotAccessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  const url: string = `https://api.hubapi.com/contacts/v1/contact/vid/${contact.hubspotId}/profile`;
  try {
    await axios.post(url, updatedContact, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hubspotAccessToken}`,
      },
    });

    return {
      error: undefined,
    };
  } catch (error) {
    return { error: (error as AxiosError)?.response?.data as string };
  }
};
