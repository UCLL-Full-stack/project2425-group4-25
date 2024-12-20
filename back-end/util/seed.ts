import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  const hashedPassword1 = await bcrypt.hash("password123", 12);
  const hashedPassword2 = await bcrypt.hash("securepass", 12);
  const hashedPassword3 = await bcrypt.hash("adminpass", 12);

  const user1 = await prisma.user.create({
    data: {
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      role: "customer",
      password: hashedPassword1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "janedoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      role: "employee",
      password: hashedPassword2,
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@example.com",
      role: "admin",
      password: hashedPassword3,
    },
  });

  const garage1 = await prisma.garage.create({
    data: {
      name: "Downtown Garage",
      size: 10,
      place: "City Center",
    },
  });

  const garage2 = await prisma.garage.create({
    data: {
      name: "Suburban Garage",
      size: 5,
      place: "Suburbs",
    },
  });

  const car1 = await prisma.car.create({
    data: {
      color: "Red",
      electric: true,
      brand: "Tesla",
      garageId: garage1.id,
      userId: user1.id,
    },
  });

  const car2 = await prisma.car.create({
    data: {
      color: "Blue",
      electric: false,
      brand: "Toyota",
      garageId: garage1.id,
      userId: user2.id,
    },
  });

  const car3 = await prisma.car.create({
    data: {
      color: "Black",
      electric: false,
      brand: "BMW",
      garageId: garage2.id,
      userId: user1.id,
    },
  });

  const maintenance1 = await prisma.maintenance.create({
    data: {
      type: "Oil Change",
      description: "Changed engine oil and filter",
      cost: 120.5,
      date: new Date("2023-11-01"),
      duration: 2,
      cars: {
        create: [
          { carId: car1.id },
          { carId: car2.id },
        ],
      },
    },
  });

  const maintenance2 = await prisma.maintenance.create({
    data: {
      type: "Tire Rotation",
      description: "Rotated all four tires",
      cost: 60.0,
      date: new Date("2023-11-15"),
      duration: 1,
      cars: {
        create: [
          { carId: car3.id },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
