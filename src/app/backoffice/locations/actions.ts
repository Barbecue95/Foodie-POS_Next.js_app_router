"use server";

import {
  getCompanyId,
  getCompanyLocations,
  getSelectedLocations,
} from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function geLocations() {
  await prisma.locations.findMany();
}

export async function getLocation(id: number) {
  const location = await prisma.locations.findFirst({
    where: { id },
    include: { selectedLocations: true },
  });
  if (!location) return redirect("/backoffice/addons");
  return location;
}

export async function createLocation(formData: FormData) {
  const name = formData.get("name") as string;
  await prisma.locations.create({
    data: { name, companyId: Number(await getCompanyId()) },
  });
  redirect("/backoffice/locations");
}

export async function updateLocation(formData: FormData) {
  const selectedLoation = await getSelectedLocations();
  const id = formData.get("id");
  const name = formData.get("name") as string;
  const isSelected = Boolean(formData.get("isSelected"));
  await prisma.locations.update({
    data: {
      name,
    },
    where: { id: Number(id) },
  });
  if (isSelected) {
    await prisma.selectedLocations.update({
      data: {
        userId: selectedLoation?.userId,
        locationId: Number(id),
      },
      where: {
        id: selectedLoation?.id,
      },
    });
  } else {
    await prisma.selectedLocations.update({
      data: {
        userId: selectedLoation?.userId,
        locationId: (await getCompanyLocations())[0].id,
      },
      where: { id: selectedLoation?.id },
    });
  }
  redirect("/backoffice/locations");
}

export async function deleteLocation(formData: FormData) {
  const id = Number(formData.get("id"));
  await prisma.locations.update({ data: { isArchived: true }, where: { id } });
  redirect("/backoffice/locations");
}
