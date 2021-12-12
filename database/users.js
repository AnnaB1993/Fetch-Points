const client = require("./index");

async function createUser({ username, email, balance }) {
  try {
    const {
      rows: [user]
    } = await client.query(
      `
        INSERT INTO users(username, email, balance)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [username, email, balance]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    const usersToCreate = [
      {
        username: "max1",
        email: "poopkindog@gmail.com",
        balance: 300
      },
      {
        username: "ryan3",
        email: "ryan123@gmail.com",
        balance: 500
      },
      {
        username: "anna93",
        email: "annab12@gmail.com",
        balance: 200
      },
      {
        username: "alicia5",
        email: "lishthefish4@gmail.com",
        balance: 100
      },
      {
        username: "brian17",
        email: "bomhardt55@gmail.com",
        balance: 400
      }
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log(users);
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, createInitialUsers };
