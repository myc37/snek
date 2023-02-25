# Ninja Van Last Mile Driver App

This project is a progressive web app designed to provide Ninja Van last mile drivers with greater transparency and motivation on the platform. By giving drivers real-time access to information about their earnings and incentives, as well as introducing new ranking and quest systems, we hope to improve driver satisfaction and ultimately increase delivery speed and quantity.

## Getting Started

```
git clone https://github.com/myc37/snek.git
cd snek
npm i
```

Add in environment variables for the database following `.env.example`

```
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Features

The Ninja Van Last Mile Driver App includes a range of features designed to improve driver transparency and motivation. These include:

**Real-time earnings breakdown:** Drivers can view a short yet detailed breakdown of all the components that add up to their monthly pay, including base pay, ranking pay, incentive pay, type pay, and penalties. This gives drivers greater transparency into their earnings and helps them to understand how they can earn more.

**Ranking system:** We have introduced a new ranking system that rewards drivers for their performance and encourages them to improve. Drivers can earn ranking pay based on their ranking within their region or country, motivating them to go above and beyond in their deliveries.

**Quests:** We have also introduced a quest system that provides drivers with specific goals to achieve and rewards them for completing these goals. This helps to keep drivers engaged and motivated, as well as reducing the incidence of fake failures where drivers mark deliveries as failed without attempting them.

**Signature and picture capture:** Drivers can capture signatures for in-person deliveries and take pictures for contactless deliveries, helping to improve parcel tracking and reduce disputes.

**Issue reporting:** Drivers can report issues for parcels they are unable to deliver, ensuring that any issues are quickly resolved and customers are kept informed.

### Admin Dashboard

The Ninja Van Last Mile Driver App also includes an admin dashboard that allows administrators to configure various pay structure, bonuses, incentives, penalties, and quest parameters for each country. This is important as each country has a different system depending on local regulations.

## Built With

The Ninja Van Last Mile Driver App was built using the following technologies:

**React.js:** We used React.js as our front-end JavaScript library to create a scalable and component-based architecture for the app.

**Next.js:** We used Next.js as our server-side rendering framework to optimize performance and SEO for the app.

**TypeScript:** We used TypeScript to ensure type safety and reduce errors throughout the app.

**Prisma:** We used Prisma as our ORM to simplify database access and management.

**PostgreSQL:** We used PostgreSQL as our database to store and manage app data.

## Acknowledgments

We would like to thank Ninja Van for providing the problem statement and supporting our hackathon project. We would also like to thank our team members and mentors for their hard work and support throughout the project.
