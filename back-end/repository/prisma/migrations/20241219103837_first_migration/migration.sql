-- CreateTable
CREATE TABLE "Garage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "electric" BOOLEAN NOT NULL,
    "brand" TEXT NOT NULL,
    "garageId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car2Maintenance" (
    "carId" INTEGER NOT NULL,
    "maintenanceId" INTEGER NOT NULL,

    CONSTRAINT "Car2Maintenance_pkey" PRIMARY KEY ("carId","maintenanceId")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car2Maintenance" ADD CONSTRAINT "Car2Maintenance_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car2Maintenance" ADD CONSTRAINT "Car2Maintenance_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "Maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
