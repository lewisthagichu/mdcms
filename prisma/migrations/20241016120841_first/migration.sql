-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "membershipNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "salutation" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL,
    "collectionCentre" TEXT NOT NULL,
    "kraPin" TEXT,
    "address" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "bank" TEXT,
    "bankAc" TEXT,
    "division" TEXT,
    "noOfCows" INTEGER NOT NULL DEFAULT 0,
    "cowsInMilk" INTEGER NOT NULL DEFAULT 0,
    "nationalIdNo" TEXT,
    "nhifNo" TEXT,
    "nhifAmt" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "village" TEXT,
    "location" TEXT,
    "subLocation" TEXT,
    "dateOfLeaving" TIMESTAMP(3),
    "creditLimit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentCreditUsed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "membershipStatus" TEXT NOT NULL DEFAULT 'Active',
    "statusDate" TIMESTAMP(3),
    "proposers" TEXT,
    "comments" TEXT,
    "sharesPaid" INTEGER,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nominee" (
    "id" SERIAL NOT NULL,
    "nomineeName" TEXT,
    "nomineeIdNo" TEXT,
    "nomineeRelationship" TEXT,
    "nomineeAddress" TEXT,
    "nomineeTelNo" TEXT,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Nominee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "receiptNo" TEXT,
    "amount" DOUBLE PRECISION,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntranceFee" (
    "id" SERIAL NOT NULL,
    "entranceMonthlyDeduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "entranceAlreadyPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "entranceExpected" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "EntranceFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyContribution" (
    "id" SERIAL NOT NULL,
    "monthlyNormal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyOverride" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyOverrideBal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "MonthlyContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewPlantShares" (
    "id" SERIAL NOT NULL,
    "newPlantMonthlyDeduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "newPlantAlreadyPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "newPlantExpected" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "newPlantCertificateNo" TEXT,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "NewPlantShares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipNo_key" ON "Member"("membershipNo");

-- CreateIndex
CREATE UNIQUE INDEX "Nominee_memberId_key" ON "Nominee"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "EntranceFee_memberId_key" ON "EntranceFee"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyContribution_memberId_key" ON "MonthlyContribution"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "NewPlantShares_memberId_key" ON "NewPlantShares"("memberId");

-- AddForeignKey
ALTER TABLE "Nominee" ADD CONSTRAINT "Nominee_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntranceFee" ADD CONSTRAINT "EntranceFee_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyContribution" ADD CONSTRAINT "MonthlyContribution_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewPlantShares" ADD CONSTRAINT "NewPlantShares_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
