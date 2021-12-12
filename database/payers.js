const client = require("./index");

async function createPayer({ payername }) {
  try {
    const {
      rows: [payer],
    } = await client.query(
      `
    INSERT INTO payers(payername)
    VALUES ($1)
    RETURNING *;
    `,
      [payername]
    );
    return payer;
  } catch (error) {
    throw error;
  }
}

async function createInitialPayers() {
  try {
    const payersToCreate = [
      {
        payername: "Kombucha",
      },

      {
        payername: "Silk",
      },

      {
        payername: "Garden",
      },

      {
        payername: "Lamarca",
      },
      {
        payername: "Tillamuk",
      },
    ];

    const payers = await Promise.all(payersToCreate.map(createPayer));
    console.log(payers);
  } catch (error) {
    throw error;
  }
}

module.exports = { createPayer, createInitialPayers };
