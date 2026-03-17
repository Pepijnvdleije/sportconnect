import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.feedback.deleteMany();
  await prisma.participation.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  const password = hashSync("password123", 12);

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Emma de Vries",
        email: "emma@example.com",
        passwordHash: password,
        age: 28,
        gender: "female",
        sportPreference: "run",
        typicalPace: "5:15 min/km",
        bio: "Morning runner, love exploring new routes around Rotterdam!",
      },
    }),
    prisma.user.create({
      data: {
        name: "Daan Bakker",
        email: "daan@example.com",
        passwordHash: password,
        age: 32,
        gender: "male",
        sportPreference: "bike",
        typicalPace: "28 km/h",
        bio: "Weekend cyclist. Always up for a ride along the Maas.",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sophie Jansen",
        email: "sophie@example.com",
        passwordHash: password,
        age: 25,
        gender: "female",
        sportPreference: "both",
        typicalPace: "5:45 min/km",
        bio: "Training for my first marathon!",
      },
    }),
    prisma.user.create({
      data: {
        name: "Lars van Dijk",
        email: "lars@example.com",
        passwordHash: password,
        age: 35,
        gender: "male",
        sportPreference: "run",
        typicalPace: "4:50 min/km",
        bio: "Experienced runner, happy to pace groups.",
      },
    }),
    prisma.user.create({
      data: {
        name: "Mila Visser",
        email: "mila@example.com",
        passwordHash: password,
        age: 30,
        gender: "female",
        sportPreference: "bike",
        typicalPace: "25 km/h",
        bio: "Casual cyclist, love coffee stops!",
      },
    }),
    prisma.user.create({
      data: {
        name: "Tom Peters",
        email: "tom@example.com",
        passwordHash: password,
        age: 27,
        gender: "male",
        sportPreference: "both",
        typicalPace: "5:30 min/km",
        bio: "New to Rotterdam, looking for training partners.",
      },
    }),
  ]);

  const [emma, daan, sophie, lars, mila, tom] = users;

  // Create activities (mix of future and past)
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const activities = await Promise.all([
    // Future activities
    prisma.activity.create({
      data: {
        title: "Morning Run along the Maas",
        sportType: "RUN",
        distance: 8.5,
        pace: "5:30 min/km",
        startDateTime: new Date(tomorrow.setHours(7, 0, 0)),
        startLat: 51.9070,
        startLng: 4.4868,
        groupType: "MIXED",
        description: "Easy morning run along the Maas river. We start at Erasmusbrug and head south. All paces welcome!",
        maxParticipants: 10,
        locationName: "Erasmusbrug, Rotterdam",
        organizerId: emma.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: "Kralingse Bos Trail Run",
        sportType: "RUN",
        distance: 12,
        pace: "5:00 min/km",
        startDateTime: new Date(new Date(tomorrow.getTime() + 2 * 24 * 60 * 60 * 1000).setHours(8, 30, 0)),
        startLat: 51.9300,
        startLng: 4.5100,
        groupType: "MIXED",
        description: "Trail run around Kralingse Plas. Moderate pace, some hills.",
        maxParticipants: 8,
        locationName: "Kralingse Bos, Rotterdam",
        organizerId: lars.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: "Women's Evening Run",
        sportType: "RUN",
        distance: 6,
        pace: "6:00 min/km",
        startDateTime: new Date(new Date(tomorrow.getTime() + 1 * 24 * 60 * 60 * 1000).setHours(19, 0, 0)),
        startLat: 51.9225,
        startLng: 4.4792,
        groupType: "FEMALE",
        description: "Relaxed evening run through the city center. Great for beginners!",
        locationName: "Centraal Station, Rotterdam",
        organizerId: sophie.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: "Weekend Cycling: Kinderdijk",
        sportType: "BIKE",
        distance: 45,
        pace: "25 km/h",
        startDateTime: new Date(nextWeek.setHours(9, 0, 0)),
        startLat: 51.9185,
        startLng: 4.4890,
        groupType: "MIXED",
        description: "Scenic ride to Kinderdijk windmills and back. Coffee stop halfway!",
        maxParticipants: 12,
        locationName: "Willemsbrug, Rotterdam",
        organizerId: daan.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: "Fast Group Ride - Maasvlakte",
        sportType: "BIKE",
        distance: 65,
        pace: "30 km/h",
        startDateTime: new Date(new Date(nextWeek.getTime() + 24 * 60 * 60 * 1000).setHours(7, 30, 0)),
        startLat: 51.9000,
        startLng: 4.4500,
        groupType: "MALE",
        description: "Fast-paced ride to Maasvlakte. Wind training! Experienced cyclists only.",
        maxParticipants: 6,
        locationName: "Charlois, Rotterdam",
        organizerId: daan.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: "Casual Bike & Coffee",
        sportType: "BIKE",
        distance: 20,
        pace: "20 km/h",
        startDateTime: new Date(new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000).setHours(10, 0, 0)),
        startLat: 51.9240,
        startLng: 4.4680,
        groupType: "MIXED",
        description: "Easy ride through the city with a coffee stop at a nice cafe.",
        locationName: "Het Park, Rotterdam",
        organizerId: mila.id,
      },
    }),
    // Past activities (for feedback testing)
    prisma.activity.create({
      data: {
        title: "Park Run Zuiderpark",
        sportType: "RUN",
        distance: 5,
        pace: "5:30 min/km",
        startDateTime: yesterday,
        startLat: 51.8950,
        startLng: 4.4700,
        groupType: "MIXED",
        description: "Quick 5K run through Zuiderpark.",
        locationName: "Zuiderpark, Rotterdam",
        organizerId: emma.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: "Sunday Long Run",
        sportType: "RUN",
        distance: 18,
        pace: "5:15 min/km",
        startDateTime: lastWeek,
        startLat: 51.9225,
        startLng: 4.4792,
        groupType: "MIXED",
        description: "Long run for marathon prep.",
        locationName: "Rotterdam Centrum",
        organizerId: lars.id,
      },
    }),
  ]);

  // Add participations
  const participationData = [
    // Future activities
    { userId: emma.id, activityId: activities[0].id },
    { userId: sophie.id, activityId: activities[0].id },
    { userId: tom.id, activityId: activities[0].id },
    { userId: lars.id, activityId: activities[1].id },
    { userId: emma.id, activityId: activities[1].id },
    { userId: tom.id, activityId: activities[1].id },
    { userId: sophie.id, activityId: activities[2].id },
    { userId: mila.id, activityId: activities[2].id },
    { userId: daan.id, activityId: activities[3].id },
    { userId: mila.id, activityId: activities[3].id },
    { userId: tom.id, activityId: activities[3].id },
    { userId: daan.id, activityId: activities[4].id },
    { userId: lars.id, activityId: activities[4].id },
    { userId: mila.id, activityId: activities[5].id },
    { userId: sophie.id, activityId: activities[5].id },
    // Past activities
    { userId: emma.id, activityId: activities[6].id },
    { userId: lars.id, activityId: activities[6].id },
    { userId: sophie.id, activityId: activities[6].id },
    { userId: tom.id, activityId: activities[6].id },
    { userId: lars.id, activityId: activities[7].id },
    { userId: emma.id, activityId: activities[7].id },
    { userId: daan.id, activityId: activities[7].id },
  ];

  for (const p of participationData) {
    await prisma.participation.create({
      data: { ...p, status: "JOINED" },
    });
  }

  // Add feedback for past activities
  await prisma.feedback.createMany({
    data: [
      { authorId: lars.id, targetId: emma.id, activityId: activities[6].id, rating: 5, comment: "Great pace leader!" },
      { authorId: sophie.id, targetId: emma.id, activityId: activities[6].id, rating: 4, comment: "Fun run, well organized." },
      { authorId: tom.id, targetId: emma.id, activityId: activities[6].id, rating: 5, comment: "Perfect for beginners." },
      { authorId: emma.id, targetId: lars.id, activityId: activities[7].id, rating: 5, comment: "Amazing route knowledge!" },
      { authorId: daan.id, targetId: lars.id, activityId: activities[7].id, rating: 4, comment: "Good pace, enjoyed it." },
    ],
  });

  console.log("Seed complete!");
  console.log(`Created ${users.length} users`);
  console.log(`Created ${activities.length} activities`);
  console.log("All test accounts use password: password123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
